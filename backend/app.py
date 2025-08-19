# # backend/app.py
import os
import shutil
import uuid
import json
import base64
from typing import Dict, Any, List, Optional
from contextlib import asynccontextmanager

# my login system import
from pydantic import BaseModel, EmailStr
from backend.database import user_collection, chat_sessions_collection, chat_messages_collection
import hashlib
import random
import string
import smtplib
from email.mime.text import MIMEText
from typing import Literal
from pymongo.errors import DuplicateKeyError
from passlib.context import CryptContext
from datetime import datetime
# my login system import end


from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File, Request, Header
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from langchain_core.messages import HumanMessage, AIMessage, BaseMessage

from langgraph.graph import StateGraph, END

from backend.config import Config
from backend.logger_config import logger
from backend.models import (
    ChatbotState, ChatRequest, ChatResponse, SkinAnalysisResult, RecommendedProductForAPI, 
    CameraCaptureRequest, UserSignUpLogin, UserSignUpRegister, OAuthLogin, UpdateProfileModel, 
    ForgotPasswordRequest, UpdatePasswordRequest, ChatMessage, ChatSession, CreateChatSessionRequest,
    ChatHistoryResponse, ChatSessionMessagesResponse, SaveMessageRequest, UpdateSessionTitleRequest,
    DeleteSessionRequest
)

from backend.agents.resources import init_chatbot_resources_for_fastapi_startup, resources_instance
from backend.agents.general_conversation import general_conversation_agent
from backend.agents.product_recommender import product_recommendation_agent
from backend.agents.knowledge_base_query import query_knowledge_base_agent
from backend.agents.intent_classifier import classify_intent_agent
from backend.agents.skin_analyzer import skin_analysis_agent
from backend.agents.product_comparison import product_comparison_agent
from backend.agents.user_identity import user_identity_agent
from backend.utils.skin_analyzer import SkinAnalyzer
from backend.products_api import router as products_router
from fastapi.staticfiles import StaticFiles

# --- FastAPI Application Setup ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("FastAPI app starting up...")
    await init_chatbot_resources_for_fastapi_startup()
    logger.info("Chatbot resources initialized.")
    app.chatbot_graph = create_langgraph_workflow()
    logger.info("LangGraph workflow compiled.")
    yield
    logger.info("FastAPI app shutting down...")
    resources_instance.close_resources()
    logger.info("Chatbot resources closed.")
    logger.info("FastAPI app shut down.")

# Define the FastAPI app only once here, including all configurations
app = FastAPI(
    title="Skincare Chatbot API",
    description="An AI-powered chatbot for skincare recommendations, advice, and skin analysis.",
    version="1.0.0",
    lifespan=lifespan
)
app.include_router(products_router)
app.mount(
    "/api/product-images",
    StaticFiles(directory="C:/Users/WaiYanHein/Desktop/chatbot/backend/static/product_images"),
    name="product-images"
)



origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    app.mount("/static/product_images", StaticFiles(directory=Config.STATIC_PRODUCT_IMAGES_DIR), name="static_product_images")
    logger.info(f"Serving static product images from '{Config.STATIC_PRODUCT_IMAGES_DIR}' at '/static/product_images'")
except Exception as e:
    logger.error(f"Failed to mount static files directory '{Config.STATIC_PRODUCT_IMAGES_DIR}': {e}", exc_info=True)



# --- LangGraph Workflow Definition ---
def create_langgraph_workflow():
    logger.info("Creating LangGraph workflow...")
    graph_state = ChatbotState
    workflow = StateGraph(graph_state)
    workflow.add_node("classify_intent_node", lambda state: classify_intent_agent(state, resources_instance))
    workflow.add_node("general_conversation_node", lambda state: general_conversation_agent(state, resources_instance))
    workflow.add_node("product_recommendation_node", lambda state: product_recommendation_agent(state, resources_instance))
    workflow.add_node("query_knowledge_base_node", lambda state: query_knowledge_base_agent(state, resources_instance))
    workflow.add_node("skin_analysis_node", lambda state: skin_analysis_agent(state, resources_instance))
    workflow.add_node("product_comparison_node", lambda state: product_comparison_agent(state, resources_instance))
    workflow.add_node("user_identity_node", lambda state: user_identity_agent(state, resources_instance))
    workflow.set_entry_point("classify_intent_node")
    workflow.add_conditional_edges(
        "classify_intent_node",
        lambda state: state['next_node'],
        {
            "general_conversation_agent": "general_conversation_node",
            "product_recommendation_agent": "product_recommendation_node",
            "query_knowledge_base_agent": "query_knowledge_base_node",
            "skin_analysis_agent": "skin_analysis_node",
            "product_comparison_agent": "product_comparison_node",
            "user_identity_agent": "user_identity_node",
        }
    )
    workflow.add_edge("general_conversation_node", END)
    workflow.add_edge("product_recommendation_node", END)
    workflow.add_edge("query_knowledge_base_node", END)
    workflow.add_edge("skin_analysis_node", END)
    workflow.add_edge("product_comparison_node", END)
    workflow.add_edge("user_identity_node", END)
    compiled_graph = workflow.compile()
    logger.info("LangGraph workflow compiled successfully.")
    return compiled_graph

def convert_lc_history_to_api_history(lc_history: List[BaseMessage]) -> List[Dict[str, str]]:
    api_history = []
    for msg in lc_history:
        if isinstance(msg, HumanMessage):
            api_history.append({"human": msg.content})
        elif isinstance(msg, AIMessage):
            api_history.append({"ai": msg.content})
    return api_history

# --- Chat History Helper Functions ---
def generate_session_id() -> str:
    """Generate a unique session ID"""
    return f"session_{uuid.uuid4().hex[:12]}"

def generate_message_id() -> str:
    """Generate a unique message ID"""
    return f"msg_{uuid.uuid4().hex[:12]}"

def create_or_get_session(user_email: str, session_id: str = None) -> str:
    """Create a new session for the user if it does not exist.

    Guarantees no DuplicateKeyError even if another user's session already
    uses the same provided session_id by regenerating a fresh one on conflict.
    """
    # Prefer supplied session_id for continuity, otherwise generate one
    candidate_session_id = session_id or generate_session_id()

    # Already exists for this user → return it
    existing_session = chat_sessions_collection.find_one({
        "session_id": candidate_session_id,
        "user_email": user_email
    })
    if existing_session:
        return candidate_session_id

    # Attempt to create; if session_id collides globally, regenerate and retry
    while True:
        try:
            session_data = {
                "session_id": candidate_session_id,
                "user_email": user_email,
                "title": "New Chat",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow(),
                "message_count": 0,
                "is_active": True
            }
            chat_sessions_collection.insert_one(session_data)
            logger.info(f"Created new chat session {candidate_session_id} for user {user_email}")
            return candidate_session_id
        except DuplicateKeyError:
            # session_id taken globally (by another user). Generate a fresh one and retry
            candidate_session_id = generate_session_id()

def save_message_to_db(session_id: str, user_email: str, sender: str, content: str, 
                      message_type: str = "text", metadata: Dict[str, Any] = None):
    """Save a message to the database"""
    message_data = {
        "message_id": generate_message_id(),
        "session_id": session_id,
        "user_email": user_email,
        "sender": sender,
        "content": content,
        "timestamp": datetime.utcnow(),
        "message_type": message_type,
        "metadata": metadata or {}
    }
    
    chat_messages_collection.insert_one(message_data)
    
    # Update session message count and timestamp
    chat_sessions_collection.update_one(
        {"session_id": session_id},
        {
            "$inc": {"message_count": 1},
            "$set": {"updated_at": datetime.utcnow()}
        }
    )
    
    logger.info(f"Saved {sender} message to session {session_id}")

# --- API Endpoints ---

@app.get("/", summary="Health Check")
async def root():
    logger.info("Root endpoint hit - health check.")
    return {"message": "Skincare Chatbot API is running!"}

# --- Chat History Endpoints ---

@app.post("/chat/sessions", response_model=Dict[str, str], summary="Create a new chat session")
async def create_chat_session(request: CreateChatSessionRequest):
    """Create a new chat session for a user"""
    try:
        # Loop to avoid rare global collision on unique session_id
        while True:
            session_id = generate_session_id()
            session_data = {
                "session_id": session_id,
                "user_email": request.user_email,
                "title": request.title or "New Chat",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow(),
                "message_count": 0,
                "is_active": True
            }
            try:
                chat_sessions_collection.insert_one(session_data)
                logger.info(f"Created new chat session {session_id} for user {request.user_email}")
                return {"session_id": session_id, "message": "Chat session created successfully"}
            except DuplicateKeyError:
                # Generate a new id and retry
                continue
    except Exception as e:
        logger.error(f"Error creating chat session: {e}")
        raise HTTPException(status_code=500, detail="Failed to create chat session")

@app.get("/chat/sessions/{user_email}", response_model=ChatHistoryResponse, summary="Get chat sessions for a user")
async def get_chat_sessions(user_email: str):
    """Get all chat sessions for a user"""
    try:
        sessions = list(chat_sessions_collection.find(
            {"user_email": user_email},
            {"_id": 0}
        ).sort("updated_at", -1))
        
        # Convert datetime objects to strings for JSON serialization
        for session in sessions:
            session["created_at"] = session["created_at"].isoformat()
            session["updated_at"] = session["updated_at"].isoformat()
        
        return ChatHistoryResponse(
            sessions=sessions,
            total_sessions=len(sessions)
        )
    except Exception as e:
        logger.error(f"Error fetching chat sessions: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch chat sessions")

@app.get("/chat/sessions/{session_id}/messages", response_model=ChatSessionMessagesResponse, summary="Get messages for a specific session")
async def get_session_messages(session_id: str):
    """Get all messages for a specific chat session"""
    try:
        messages = list(chat_messages_collection.find(
            {"session_id": session_id},
            {"_id": 0}
        ).sort("timestamp", 1))
        
        # Convert datetime objects to strings for JSON serialization
        for message in messages:
            message["timestamp"] = message["timestamp"].isoformat()
        
        return ChatSessionMessagesResponse(
            session_id=session_id,
            messages=messages,
            total_messages=len(messages)
        )
    except Exception as e:
        logger.error(f"Error fetching session messages: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch session messages")

@app.put("/chat/sessions/{session_id}/title", summary="Update session title")
async def update_session_title(session_id: str, request: UpdateSessionTitleRequest):
    """Update the title of a chat session"""
    try:
        result = chat_sessions_collection.update_one(
            {"session_id": session_id},
            {"$set": {"title": request.title, "updated_at": datetime.utcnow()}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Session not found")
        
        return {"message": "Session title updated successfully"}
    except Exception as e:
        logger.error(f"Error updating session title: {e}")
        raise HTTPException(status_code=500, detail="Failed to update session title")

@app.delete("/chat/sessions/{session_id}", summary="Delete a chat session")
async def delete_chat_session(session_id: str):
    """Delete a chat session and all its messages"""
    try:
        # Delete all messages in the session
        chat_messages_collection.delete_many({"session_id": session_id})
        
        # Delete the session
        result = chat_sessions_collection.delete_one({"session_id": session_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Session not found")
        
        return {"message": "Session deleted successfully"}
    except Exception as e:
        logger.error(f"Error deleting session: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete session")

# --- Corrected Endpoint to Upload an Image for Skin Analysis ---
@app.post("/upload_image", response_model=ChatResponse, summary="Upload an image for skin analysis and trigger chatbot response")
async def upload_image_endpoint(
    session_id: str, 
    file: UploadFile = File(...)
):
    logger.info(f"Received image upload for session_id: {session_id}, file: {file.filename}")
    if file.content_type not in ["image/jpeg", "image/png"]:
        logger.warning(f"Invalid file type uploaded: {file.content_type}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only JPEG and PNG images are allowed."
        )
    if not resources_instance.skin_analyzer or not resources_instance.ollama_json_llm:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Required AI services are not available."
        )

    try:
        image_bytes = await file.read()
        skin_analysis_result_text = resources_instance.skin_analyzer.analyze_skin_type(image_bytes)
        logger.info(f"APP_RECEIVED_SKIN_ANALYSIS_TEXT: '{skin_analysis_result_text}'")
        if "An error occurred" in skin_analysis_result_text:
            raise Exception(skin_analysis_result_text)

        logger.info("Parsing skin analysis result into a structured format using LLM.")
        prompt = f"""
        You are a highly skilled data parser. You have received the following skin analysis text:
        "{skin_analysis_result_text}"

        Extract the skin type, any detected concerns, and general recommendations from the text.
        Your output MUST be a single JSON object with the following keys:
        - "skin_type": (str) The detected skin type (e.g., "Normal", "Oily", "Dry", "Combination").
        - "concerns": (list[str]) A list of any detected skin concerns (e.g., "Acne", "Redness", "Fine lines").
        - "recommendations": (str) A brief summary of the general recommendations.
        """
        llm_response_object = resources_instance.ollama_json_llm.invoke(prompt)
        response_json_string = llm_response_object.content
        parsed_data = json.loads(response_json_string)
        logger.info(f"LLM_PARSED_JSON: {json.dumps(parsed_data, indent=2)}")
        logger.info(f"LLM_PARSED_SKIN_TYPE: {parsed_data.get('skin_type')}")
        logger.info(f"LLM_PARSED_CONCERNS: {parsed_data.get('concerns')}")
        skin_analysis_result_model = SkinAnalysisResult(
            skin_type=parsed_data.get("skin_type", "Unknown"),
            concerns=parsed_data.get("concerns", []),
            recommendations=parsed_data.get("recommendations", "No specific recommendations provided.")
        )

        logger.info(f"Skin analysis model for session {session_id} created: {skin_analysis_result_model.skin_type}")

        initial_state: ChatbotState = {
            "user_message": "Image analysis complete.",
            "chat_history": [],
            "intent": "skin_analysis_request_processed",
            "next_node": "skin_analysis_agent",
            "response": "",
            "product_recommendation_data": None,
            "skin_analysis_result_data": skin_analysis_result_model,
            "retrieved_docs": None,
            "comparison_products": None,
            "user_data": None,  # No user data for image uploads
        }
        final_state = skin_analysis_agent(initial_state, resources_instance)
        response_text = final_state.get("response", "An error occurred during analysis response generation.")

        return ChatResponse(
            response=response_text,
            chat_history=[],
            product_recommendation=None,
            skin_analysis_result=skin_analysis_result_model
        )

    except Exception as e:
        logger.error(f"Error during image upload, analysis, or parsing: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred during image processing: {e}"
        )




@app.post("/chat", response_model=ChatResponse, summary="Send a chat message to the chatbot")
async def chat_endpoint(request: ChatRequest):
    try:
        logger.info(f"Received chat request: User message='{request.user_message}'")

        # Get user email from user_data if available
        user_email = None
        if request.user_data and "email" in request.user_data:
            user_email = request.user_data["email"]
        
        # Create or get session
        session_id = create_or_get_session(user_email, request.session_id) if user_email else request.session_id

        lc_chat_history: List[BaseMessage] = []
        if request.chat_history:
            for msg_dict in request.chat_history:
                if "human" in msg_dict:
                    lc_chat_history.append(HumanMessage(content=msg_dict["human"]))
                elif "ai" in msg_dict:
                    lc_chat_history.append(AIMessage(content=msg_dict["ai"]))

        initial_state: ChatbotState = {
            "user_message": request.user_message,
            "chat_history": lc_chat_history,
            "intent": "unclassified",
            "next_node": "",
            "response": "",
            "product_recommendation_data": None,
            "skin_analysis_result_data": None,
            "retrieved_docs": None,
            "comparison_products": None,
            "user_data": request.user_data,
        }

        logger.debug("Invoking LangGraph with initial state.")
        final_state: ChatbotState = await app.chatbot_graph.ainvoke(initial_state)
        logger.debug(f"LangGraph execution finished. Final state: {final_state}")

        response_text = final_state.get("response", "I'm sorry, I couldn't process your request fully. Please try again.")

        updated_lc_chat_history = lc_chat_history + [
            HumanMessage(content=request.user_message),
            AIMessage(content=response_text)
        ]
        api_chat_history = convert_lc_history_to_api_history(updated_lc_chat_history)

        api_product_recommendations = final_state.get("product_recommendation_data")
        api_skin_analysis_result = final_state.get("skin_analysis_result_data")

        # Save messages to database if user is logged in
        if user_email:
            # Save user message
            save_message_to_db(
                session_id=session_id,
                user_email=user_email,
                sender="user",
                content=request.user_message,
                message_type="text"
            )
            
            # Save bot response
            metadata = {}
            if api_product_recommendations:
                metadata["product_recommendations"] = [rec.dict() for rec in api_product_recommendations]
            if api_skin_analysis_result:
                metadata["skin_analysis"] = api_skin_analysis_result.dict()
            
            save_message_to_db(
                session_id=session_id,
                user_email=user_email,
                sender="bot",
                content=response_text,
                message_type="text",
                metadata=metadata
            )

        return ChatResponse(
            response=response_text,
            chat_history=api_chat_history,
            product_recommendation=api_product_recommendations,
            skin_analysis_result=api_skin_analysis_result
        )

    except Exception as e:
        logger.error(f"Error during chat processing: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An internal error occurred: {e}"
        )

@app.post("/capture_image", response_model=ChatResponse, summary="Capture an image from a camera for skin analysis")
async def capture_image_endpoint(request: CameraCaptureRequest):
    logger.info(f"Received camera capture for session_id: {request.session_id}")
    if not resources_instance.skin_analyzer or not resources_instance.ollama_json_llm:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Required AI services are not available."
        )

    try:
        image_data_base64 = request.image_data
        if ';base64,' in image_data_base64:
            header, image_data_base64 = image_data_base64.split(';base64,')

        image_bytes = base64.b64decode(image_data_base64)

        skin_analysis_result_text = resources_instance.skin_analyzer.analyze_skin_type(image_bytes)
        logger.info(f"APP_RECEIVED_SKIN_ANALYSIS_TEXT: '{skin_analysis_result_text}'")
        if "An error occurred" in skin_analysis_result_text:
            raise Exception(skin_analysis_result_text)

        logger.info("Parsing skin analysis result into a structured format using LLM.")
        prompt = f"""
        You are a highly skilled data parser. You have received the following skin analysis text:
        "{skin_analysis_result_text}"

        Extract the skin type, any detected concerns, and general recommendations from the text.
        Your output MUST be a single JSON object with the following keys:
        - "skin_type": (str) The detected skin type (e.g., "Normal", "Oily", "Dry", "Combination").
        - "concerns": (list[str]) A list of any detected skin concerns (e.g., "Acne", "Redness", "Fine lines").
        - "recommendations": (str) A brief summary of the general recommendations.
        """
        llm_response_object = resources_instance.ollama_json_llm.invoke(prompt)
        response_json_string = llm_response_object.content
        parsed_data = json.loads(response_json_string)

        logger.info(f"LLM_PARSED_JSON: {json.dumps(parsed_data, indent=2)}")
        logger.info(f"LLM_PARSED_SKIN_TYPE: {parsed_data.get('skin_type')}")
        logger.info(f"LLM_PARSED_CONCERNS: {parsed_data.get('concerns')}")

        skin_analysis_result_model = SkinAnalysisResult(
            skin_type=parsed_data.get("skin_type", "Unknown"),
            concerns=parsed_data.get("concerns", []),
            recommendations=parsed_data.get("recommendations", "No specific recommendations provided.")
        )

        logger.info(f"Skin analysis model for session {request.session_id} created: {skin_analysis_result_model.skin_type}")

        initial_state: ChatbotState = {
            "user_message": "Image analysis complete.",
            "chat_history": [],
            "intent": "skin_analysis_request_processed",
            "next_node": "skin_analysis_agent",
            "response": "",
            "product_recommendation_data": None,
            "skin_analysis_result_data": skin_analysis_result_model,
            "retrieved_docs": None,
            "comparison_products": None,
            "user_data": None,  # No user data for image uploads
        }
        final_state = skin_analysis_agent(initial_state, resources_instance)
        response_text = final_state.get("response", "An error occurred during analysis response generation.")

        return ChatResponse(
            response=response_text,
            chat_history=[],
            product_recommendation=None,
            skin_analysis_result=skin_analysis_result_model
        )

    except Exception as e:
        logger.error(f"Error during camera capture, analysis, or parsing: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred during image processing: {e}"
        )




# Password hashing
def hash_password(password: str):
    return hashlib.sha256(password.encode()).hexdigest()

# Generate random password
def generate_random_password(length=10):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

# Simulated email sender (Replace this with real SMTP settings)
def send_email(to_email: str, new_password: str):
    print(f"Simulating sending email to {to_email} with new password: {new_password}")
    # Uncomment and configure this part if you want real email sending
    """
    msg = MIMEText(f"Your new password is: {new_password}")
    msg['Subject'] = 'Password Reset'
    msg['From'] = 'your@email.com'
    msg['To'] = to_email

    with smtplib.SMTP('smtp.example.com', 587) as server:
        server.starttls()
        server.login('your@email.com', 'yourpassword')
        server.send_message(msg)
    """



@app.post("/usersignupregister")
def user_signupregrister(user: UserSignUpRegister):
    if user.password != user.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    if user_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = hash_password(user.password)
    user_data = {
        "name": user.name,
        "age": user.age,
        "gender": user.gender,
        "email": user.email,
        "password": hashed_pw,
        "secret":user.secret,
        "auth_type": "email"
    }
    user_collection.insert_one(user_data)
    return {"message": "User registered successfully"}


@app.post("/usersignuplogin")
def user_signuplogin(user: UserSignUpLogin):
    found_user = user_collection.find_one({"email": user.email})
    if not found_user:
        raise HTTPException(status_code=404, detail="User not found")

    if found_user["auth_type"] != "email":
        raise HTTPException(status_code=400, detail="Use correct login method")

    if found_user["password"] != hash_password(user.password):
        raise HTTPException(status_code=401, detail="Incorrect password")

  
    return {
        "message": "Login successful",
        "user": {
            "name": found_user["name"],
            "age": found_user["age"],
            "gender": found_user["gender"],
            "email": found_user["email"]
        }
    }


@app.post("/forgot-password")
def forgot_password(data: ForgotPasswordRequest):
    user = user_collection.find_one({"email": data.email, "secret": data.secret})
    if not user:
        raise HTTPException(status_code=404, detail="Incorrect email or secret answer")

    return {"message": "Verification successful"}


@app.put("/update-password")
def update_password(data: UpdatePasswordRequest):
    hashed_pw = hash_password(data.new_password)

    result = user_collection.update_one(
        {"email": data.email},
        {"$set": {"password": hashed_pw}}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "Password updated successfully"}

@app.post("/oauth-auth")
def oauth_auth(data: OAuthLogin):
    hashed_token = hash_password(data.password)
    existing_user = user_collection.find_one({"email": data.email})

    if existing_user:
        # ✅ Check for mismatched provider
        if existing_user.get("auth_type") != data.provider:
            user_collection.update_one(
                {"email": data.email},
                {"$set": {
                    "auth_type": data.provider,
                    "provider_token": hashed_token
                }}
            )
        else:
            if existing_user.get("provider_token") != hashed_token:
                raise HTTPException(status_code=401, detail="Invalid token")

       
        updated_user = user_collection.find_one({"email": data.email})
        return {
            "message": f"Login successful with {data.provider}",
            "user": {
                "name": updated_user.get("name", ""),
                "age": updated_user.get("age", ""),
                "gender": updated_user.get("gender", ""),
                "email": updated_user["email"]
            }
        }

 
    new_user = {
        "email": data.email,
        "auth_type": data.provider,
        "provider_token": hashed_token,
        "name": "",
        "age": "",
        "gender": "",
       
    }

    user_collection.insert_one(new_user)

    return {
        "message": f"User registered and logged in with {data.provider}",
        "user": {
            "name": "",
            "age": "",
            "gender": "",
            "email": new_user["email"]
        }
    }

@app.put("/update-profile")
def update_profile(data: UpdateProfileModel):
    result = user_collection.update_one(
        {"email": data.email},
        {"$set": {
            "name": data.name,
            "age": data.age,
            "gender": data.gender
        }}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"message": "Profile updated successfully"}
