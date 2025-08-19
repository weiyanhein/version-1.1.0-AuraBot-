# # backend/agents/intent_classifier.py
import os
from typing import Dict, Any
from backend.models import ChatbotState
from backend.agents.resources import ChatbotResources
from backend.config import Config
from backend.logger_config import logger # Import the centralized logger

def classify_intent_agent(state: ChatbotState, resources: ChatbotResources) -> ChatbotState:
    """
    Classifies the user's intent based on the input message.
    It uses a pre-trained TF-IDF vectorizer and a classifier model.
    """
    user_message = state.get("user_message", "").strip()
    logger.info(f"Intent Classifier Agent activated for user message: '{user_message}'")

    tfidf_vectorizer = resources.tfidf_vectorizer
    intent_classifier_model = resources.intent_classifier_model
    intent_labels = resources.intent_labels

    if tfidf_vectorizer is None or intent_classifier_model is None or intent_labels is None:
        logger.warning("Intent classification models are not loaded. Defaulting intent to 'general_conversation'.")
        state['intent'] = "general_conversation"
        state['next_node'] = "general_conversation_agent"
        state['response'] = "I'm having trouble understanding complex requests right now, but I can chat generally. How can I help?"
        return state

    try:
        user_message_vectorized = tfidf_vectorizer.transform([user_message])
        # Predict intent probabilities
        probabilities = intent_classifier_model.predict_proba(user_message_vectorized)[0]
        max_prob_idx = probabilities.argmax()
        predicted_intent_label = intent_labels[max_prob_idx]
        confidence = probabilities[max_prob_idx]

        logger.info(f"Predicted intent: '{predicted_intent_label}' with confidence: {confidence:.2f}")

        # Default fallback if no specific intent matches or confidence is low
        default_intent = "general_conversation"
        default_next_node = "general_conversation_agent"

        # Determine the next node based on confidence and predicted intent
        if confidence >= Config.INTENT_CONFIDENCE_THRESHOLD:
            state['intent'] = predicted_intent_label
            # Explicitly map all intents from your training data to a specific agent
            if predicted_intent_label == "product_query":
                state['next_node'] = "product_recommendation_agent"
            elif predicted_intent_label == "guideline_query":
                state['next_node'] = "query_knowledge_base_agent"
            elif predicted_intent_label == "product_comparison":
                state['next_node'] = "product_comparison_agent"
            elif predicted_intent_label == "skin_analysis_request": #  training data
                state['next_node'] = "skin_analysis_agent"
            elif predicted_intent_label == "general_conversation": # Explicitly map if merge greeting/about_bot
                state['next_node'] = "general_conversation_agent"
            elif predicted_intent_label == "thanks":
                state['next_node'] = "general_conversation_agent" # Can use general  for simple thanks
            elif predicted_intent_label == "goodbye":
                state['next_node'] = "general_conversation_agent" # Can use general  for simple goodbyes
            elif predicted_intent_label == "out_of_scope":
                state['next_node'] = "general_conversation_agent" # Route OOS to general conv with a specific response in next step
                # Note:a dedicated 'out_of_scope_agent'  can add more 
            elif predicted_intent_label == "user_identity_query":
                state['next_node'] = "user_identity_agent"
            else:
                # This 'else' should now only catch genuinely unhandled or new intents
                logger.warning(f"Predicted intent '{predicted_intent_label}' was not explicitly mapped to a specific agent node. Falling back to general conversation.")
                state['next_node'] = default_next_node
                state['intent'] = default_intent
        else:
            logger.info(f"Predicted intent confidence ({confidence:.2f}) below threshold ({Config.INTENT_CONFIDENCE_THRESHOLD}). Falling back to general conversation.")
            state['intent'] = default_intent
            state['next_node'] = default_next_node

        logger.info(f"Intent Classifier output: Intent='{state['intent']}', Next Node='{state['next_node']}'")
        return state

    except Exception as e:
        logger.error(f"Error in classify_intent_agent: {e}", exc_info=True)
        # Fallback to general conversation on any error
        state['intent'] = default_intent
        state['next_node'] = default_next_node
        state['response'] = "I apologize, I had trouble understanding your request. Let's try a general conversation."
        return state