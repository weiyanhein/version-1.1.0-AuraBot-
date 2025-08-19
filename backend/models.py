from typing import List, Literal, Optional, TypedDict, Dict, Any
from pydantic import BaseModel, Field,EmailStr
from langchain_core.messages import BaseMessage # Important for chat_history type
from datetime import datetime

# --- Pydantic Models for API Responses ---
class RecommendedProductForAPI(BaseModel):
    name: str = Field(description="The name of the recommended product.")
    brand: str = Field(description="The brand of the recommended product.")
    product_id: str = Field(description="The unique ID of the product.")
    image_filename: str = Field(description="The filename of the product image (e.g., prod_001.jpg).")
    image_url: str = Field(description="The full URL to the product image, hosted by the API.")
    reasoning: str = Field(description="A brief explanation why this product is suitable for the user's needs, based on the query, benefits, concerns, or key ingredients.")
    product_type: Optional[str] = Field(None, description="The type of the product (e.g., serum, cleanser, moisturizer).")
    ingredients: Optional[List[str]] = Field(None, description="Key ingredients of the product.")
    benefits: Optional[List[str]] = Field(None, description="Main benefits provided by the product.")
    usage: Optional[str] = Field(None, description="Instructions on how to use the product.")

class SkinAnalysisResult(BaseModel):
    skin_type: str = Field(description="The detected skin type (e.g., 'oily', 'dry', 'combination', 'normal', 'sensitive').")
    concerns: List[str] = Field(default_factory=list, description="A list of detected skin concerns (e.g., 'acne', 'redness', 'dark spots').")
    recommendations: str = Field(description="General advice or immediate next steps based on the analysis.")

class ChatResponse(BaseModel):
    response: str = Field(description="The natural language response from the chatbot.")
    chat_history: List[Dict[str, str]] = Field(description="A simplified history of the conversation for the frontend, with 'human' or 'ai' keys.")
    product_recommendation: Optional[List[RecommendedProductForAPI]] = Field(None, description="A list of product recommendations, if any, with full details for the API.")
    skin_analysis_result: Optional[SkinAnalysisResult] = Field(None, description="The result of a skin analysis, if performed and relevant.")

# --- Pydantic Model for API Requests ---
class ChatRequest(BaseModel):
    user_message: str = Field(description="The current message from the user.")
    session_id: str = Field(description="The unique session identifier for the conversation.")
    chat_history: Optional[List[Dict[str, str]]] = Field(None, description="A simplified history of previous turns in the conversation.")
    skin_analysis_result: Optional[SkinAnalysisResult] = Field(None, description="Previously obtained skin analysis result, passed back from the frontend for context.")
    user_data: Optional[Dict[str, Any]] = Field(None, description="User data from cookies for personalized responses.")

class SkinAnalysisRequest(BaseModel):
    image_path: str = Field(description="Local path to the uploaded image for analysis. (Note: This is illustrative, actual image upload is via FastAPI's UploadFile).")
    

class CameraCaptureRequest(BaseModel):
    session_id: str = Field(description="The unique session identifier.")
    image_data: str = Field(description="Base64-encoded image data from the camera.")

# --- Pydantic Model for LLM Output (Internal to Agent - strictly for JSON parsing) ---
class LLMRecommendedProduct(BaseModel):
    name: str = Field(description="The name of the recommended product.")
    brand: str = Field(description="The brand of the recommended product.")
    product_id: str = Field(description="The unique ID of the product, used to fetch full details.")
    image_filename: str = Field(description="The filename of the product image (e.g., prod_001.jpg), used for constructing the image URL.")
    reasoning: str = Field(description="A concise reason why this specific product is recommended for the user's query.")
    product_type: Optional[str] = Field(None, description="The type of the product (e.g., serum, cleanser).")
    ingredients: Optional[List[str]] = Field(None, description="Key ingredients of the product.")
    benefits: Optional[List[str]] = Field(None, description="Main benefits of the product.")
    usage: Optional[str] = Field(None, description="Brief instructions on how to use the product.")

class ProductRecommendationResponse(BaseModel):
    recommendations: List[LLMRecommendedProduct] = Field(description="A list of recommended products based on the user's query and provided product information.")
    general_message: str = Field(description="A friendly, concise general message introducing the recommendations to the user.")

# --- LangChain Graph State Definition (TypedDict) ---
class ChatbotState(TypedDict):
    user_message: str
    chat_history: List[BaseMessage] # Internal chat history uses LangChain BaseMessage objects (HumanMessage, AIMessage)
    intent: str # Set by intent_classifier (e.g., "product_query", "guideline_query")
    next_node: str # Set by intent_classifier, directs graph flow to the next agent
    response: str # The final text response generated by an agent
    product_recommendation_data: Optional[List[RecommendedProductForAPI]] # Final processed product data for API response
    skin_analysis_result_data: Optional[SkinAnalysisResult] # Internal skin analysis result data, passed between agents
    retrieved_docs: Optional[List[Dict[str, Any]]] # Contextual documents retrieved from vector stores
    comparison_products: Optional[List[Dict[str, Any]]] # Data for product comparison
    user_data: Optional[Dict[str, Any]] # User data from cookies for personalized responses
    # Add other state variables as needed by new agents or for cross-agent communication
    skin_analysis_result: Optional[str] = None # Stores the result like "Dry Skin"
    awaiting_skin_image: bool = False # backend/agents/resources.py

# --- Chat History Models ---
class ChatMessage(BaseModel):
    message_id: str = Field(description="Unique identifier for the message")
    session_id: str = Field(description="Session identifier this message belongs to")
    user_email: str = Field(description="Email of the user who sent this message")
    sender: Literal["user", "bot"] = Field(description="Who sent the message")
    content: str = Field(description="The message content")
    timestamp: datetime = Field(description="When the message was sent")
    message_type: Literal["text", "image", "product_recommendation", "skin_analysis"] = Field(default="text", description="Type of message")
    metadata: Optional[Dict[str, Any]] = Field(None, description="Additional data like product recommendations, skin analysis results, etc.")

class ChatSession(BaseModel):
    session_id: str = Field(description="Unique identifier for the chat session")
    user_email: str = Field(description="Email of the user who owns this session")
    title: str = Field(description="Title of the chat session (first message or auto-generated)")
    created_at: datetime = Field(description="When the session was created")
    updated_at: datetime = Field(description="When the session was last updated")
    message_count: int = Field(default=0, description="Number of messages in this session")
    is_active: bool = Field(default=True, description="Whether this session is currently active")

class CreateChatSessionRequest(BaseModel):
    user_email: str = Field(description="Email of the user creating the session")
    title: Optional[str] = Field(None, description="Optional title for the session")

class ChatHistoryResponse(BaseModel):
    sessions: List[ChatSession] = Field(description="List of chat sessions for the user")
    total_sessions: int = Field(description="Total number of sessions")

class ChatSessionMessagesResponse(BaseModel):
    session_id: str = Field(description="Session identifier")
    messages: List[ChatMessage] = Field(description="List of messages in the session")
    total_messages: int = Field(description="Total number of messages")

class SaveMessageRequest(BaseModel):
    session_id: str = Field(description="Session identifier")
    user_email: str = Field(description="Email of the user")
    sender: Literal["user", "bot"] = Field(description="Who sent the message")
    content: str = Field(description="The message content")
    message_type: Literal["text", "image", "product_recommendation", "skin_analysis"] = Field(default="text")
    metadata: Optional[Dict[str, Any]] = Field(None, description="Additional data")

class UpdateSessionTitleRequest(BaseModel):
    session_id: str = Field(description="Session identifier")
    title: str = Field(description="New title for the session")

class DeleteSessionRequest(BaseModel):
    session_id: str = Field(description="Session identifier to delete")

class UserSignUpRegister(BaseModel):
    name: str
    age: int
    gender: Literal["male", "female"]
    secret:str
    email: EmailStr
    password: str
    confirm_password: str


class UserSignUpLogin(BaseModel):
    email: EmailStr
    password: str
   

class OAuthLogin(BaseModel):
    email: EmailStr
    password: str
    provider: Literal["google", "facebook"]
    name: Optional[str] = ""
    age: Optional[str] = ""
    gender: Optional[str] = ""
  

class UpdateProfileModel(BaseModel):
    email: EmailStr
    name: str
    age: int
    gender: Literal["male", "female"]
  


class ForgotPasswordRequest(BaseModel):
    email: EmailStr
    secret: str

class UpdatePasswordRequest(BaseModel):
    email: EmailStr
    new_password: str


