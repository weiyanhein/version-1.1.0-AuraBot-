# backend/agents/user_identity.py
import random
from typing import Dict, Any, List
from backend.models import ChatbotState
from backend.agents.resources import ChatbotResources
from backend.logger_config import logger

def user_identity_agent(state: ChatbotState, resources: ChatbotResources) -> ChatbotState:
    """
    Enhanced user identity agent that provides attractive, detailed, and varied responses
    based on specific user queries about their profile information.
    """
    user_message = state.get("user_message", "").strip().lower()
    user_data = state.get("user_data", None)
    
    logger.info(f"User Identity Agent activated for user message: '{user_message}'")
    logger.info(f"User data available: {user_data is not None}")

    if not user_data:
        response = get_no_user_data_response()
    else:
        response = analyze_and_respond_to_query(user_message, user_data)

    state['response'] = response
    state['intent'] = "user_identity_query"
    
    logger.info(f"User Identity Agent response: {response}")
    return state

def get_no_user_data_response() -> str:
    """Generate attractive response when no user data is available"""
    responses = [
        "🌟 I'd love to get to know you better! To provide personalized skincare advice, please log in or create an account. Once you're signed in, I'll remember your preferences and give you tailored recommendations! ✨",
        
        "💫 Oh, I don't have your information yet! But don't worry - once you log in or create an account, I'll be your personal skincare companion. I'll remember everything about you and provide customized beauty advice! 🌸",
        
        "🎀 I'm excited to meet you! To unlock personalized skincare magic, please sign in or create an account. I'll then become your beauty bestie who remembers all your details and preferences! 💖",
        
        "✨ I can't wait to learn about you! Please log in or create an account so I can provide you with personalized skincare recommendations. I'll remember your skin type, preferences, and give you the best advice! 🌟"
    ]
    return random.choice(responses)

def analyze_and_respond_to_query(user_message: str, user_data: Dict[str, Any]) -> str:
    """Analyze the user query and provide targeted response"""
    
    # Extract user information
    name = user_data.get("name", "").strip()
    age = user_data.get("age", "")
    gender = user_data.get("gender", "").strip()
    email = user_data.get("email", "").strip()
    
    # Query analysis - determine what specific information the user wants
    query_type = analyze_query_type(user_message)
    
    if query_type == "name_only":
        return get_name_response(name)
    elif query_type == "age_only":
        return get_age_response(name, age)
    elif query_type == "email_only":
        return get_email_response(name, email)
    elif query_type == "gender_only":
        return get_gender_response(name, gender)
    elif query_type == "profile_summary":
        return get_profile_summary_response(name, age, gender, email)
    elif query_type == "general_identity":
        return get_general_identity_response(name, age, gender, email)
    else:
        return get_default_response(name, age, gender, email)

def analyze_query_type(user_message: str) -> str:
    """Analyze the user message to determine what specific information they want"""
    
    # Name-specific queries
    name_keywords = ["my name","what's my name", "who am i", "my identity", "what do you call me","Do you know my full name?", "Are you aware of my name?"]
    if any(keyword in user_message for keyword in name_keywords):
        return "name_only"
    
    # Age-specific queries
    age_keywords = ["my age", "my age","how old am i", "what's my age", "my birthday", "when was i born"]
    if any(keyword in user_message for keyword in age_keywords):
        return "age_only"
    
    # Email-specific queries
    email_keywords = ["my email", "what's my email", "my contact", "my email address", "do you know my email address"]
    if any(keyword in user_message for keyword in email_keywords):
        return "email_only"
    
    # Gender-specific queries
    gender_keywords = ["my gender", "what's my gender", "am i male", "am i female", "my sex"]
    if any(keyword in user_message for keyword in gender_keywords):
        return "gender_only"
    
    # Profile summary queries
    profile_keywords = ["my profile", "my information", "my details", "what do you know about me", "my data","tell me about myself","Is my name stored?","Do you remember who I am?","Do you have any personal information about me?", "Can you confirm my identity?", "What is my user ID?","Can you access my information?","I want to know about myself","about me"]
    if any(keyword in user_message for keyword in profile_keywords):
        return "profile_summary"
    
    # General identity queries
    general_keywords = ["do you know me", "remember me", "who am i", "tell me about myself","Is my name stored?","Do you remember who I am?","Do you have any personal information about me?", "Can you confirm my identity?", "What is my user ID?","Can you access my information?","I want to know about myself","about"]
    if any(keyword in user_message for keyword in general_keywords):
        return "general_identity"
    
    return "default"

def get_name_response(name: str) -> str:
    """Generate attractive name-specific responses"""
    if not name:
        return "🌟 I don't have your name in my records yet! Could you please update your profile with your name? I'd love to address you personally! ✨"
    
    responses = [
        f"💖 Your beautiful name is **{name}**! I love how it sounds - it's perfect for you! ✨",
        f"🌟 Of course! You're **{name}** - such a lovely name that suits you perfectly! 💫",
        f"🎀 Your name is **{name}**! I think it's absolutely gorgeous and fits you wonderfully! 🌸",
        f"✨ You're **{name}**! What a stunning name - it has such a beautiful ring to it! 💖",
        f"💫 Yes! You're **{name}** - a name as beautiful as you are! I adore it! 🌟"
    ]
    return random.choice(responses)

def get_age_response(name: str, age: str) -> str:
    """Generate attractive age-specific responses"""
    if not age:
        return f"🌟 I don't have your age in my records yet, {name}! Could you please update your profile? Your age helps me provide better skincare recommendations! ✨"
    
    try:
        age_num = int(age)
        if age_num < 18:
            age_group = "young"
        elif age_num < 30:
            age_group = "young adult"
        elif age_num < 50:
            age_group = "adult"
        else:
            age_group = "mature"
    except:
        age_group = "beautiful"
    
    responses = [
        f"💖 You're **{age} years old**, {name}! At this {age_group} age, you're absolutely radiant! ✨",
        f"🌟 You're **{age} years young**, {name}! Age is just a number, and you're aging beautifully! 💫",
        f"🎀 You're **{age} years old**, {name}! You're at such a wonderful stage in life! 🌸",
        f"✨ You're **{age} years young**, {name}! You're glowing at this age! 💖",
        f"💫 You're **{age} years old**, {name}! You're absolutely stunning at this age! 🌟"
    ]
    return random.choice(responses)

def get_email_response(name: str, email: str) -> str:
    """Generate attractive email-specific responses"""
    if not email:
        return f"🌟 I don't have your email address yet, {name}! Could you please update your profile? It helps me keep you informed about your skincare journey! ✨"
    
    responses = [
        f"💖 Your email address is **{email}**, {name}! I use this to keep track of your beauty journey! ✨",
        f"🌟 Your contact email is **{email}**, {name}! This helps me stay connected with you! 💫",
        f"🎀 Your email is **{email}**, {name}! I'll use this to send you personalized beauty updates! 🌸",
        f"✨ Your email address is **{email}**, {name}! This keeps us connected for your skincare needs! 💖",
        f"💫 Your email is **{email}**, {name}! I'll use this to keep you updated on your beauty journey! 🌟"
    ]
    return random.choice(responses)

def get_gender_response(name: str, gender: str) -> str:
    """Generate attractive gender-specific responses"""
    if not gender:
        return f"🌟 I don't have your gender information yet, {name}! Could you please update your profile? This helps me provide more personalized skincare advice! ✨"
    
    responses = [
        f"💖 You identify as **{gender}**, {name}! This helps me tailor my skincare recommendations perfectly for you! ✨",
        f"🌟 You're **{gender}**, {name}! I love providing gender-specific beauty advice that's just right for you! 💫",
        f"🎀 You identify as **{gender}**, {name}! This allows me to give you the most personalized skincare tips! 🌸",
        f"✨ You're **{gender}**, {name}! I'm excited to provide you with tailored beauty recommendations! 💖",
        f"💫 You identify as **{gender}**, {name}! This helps me create the perfect skincare routine for you! 🌟"
    ]
    return random.choice(responses)

def get_profile_summary_response(name: str, age: str, gender: str, email: str) -> str:
    """Generate comprehensive profile summary responses"""
    available_info = []
    
    if name:
        available_info.append(f"**Name**: {name}")
    if age:
        available_info.append(f"**Age**: {age} years old")
    if gender:
        available_info.append(f"**Gender**: {gender}")
    if email:
        available_info.append(f"**Email**: {email}")
    
    if not available_info:
        return "🌟 I can see you're logged in, but I don't have much information about you yet! Please update your profile so I can provide you with personalized skincare advice! ✨"
    
    info_text = "\n".join(available_info)
    
    responses = [
        f"💖 Here's your beautiful profile, {name}:\n\n{info_text}\n\nI'm here to provide you with personalized skincare magic! ✨",
        f"🌟 Your profile information:\n\n{info_text}\n\nI use this to give you the best beauty advice possible! 💫",
        f"🎀 Here's what I know about you:\n\n{info_text}\n\nI'm excited to help you with personalized skincare! 🌸",
        f"✨ Your profile details:\n\n{info_text}\n\nThis helps me create the perfect beauty routine for you! 💖",
        f"💫 Here's your information:\n\n{info_text}\n\nI'm here to make your skincare journey amazing! 🌟"
    ]
    return random.choice(responses)

def get_general_identity_response(name: str, age: str, gender: str, email: str) -> str:
    """Generate general identity responses"""
    available_info = []
    
    if name:
        available_info.append(f"your name is {name}")
    if age:
        available_info.append(f"you're {age} years old")
    if gender:
        available_info.append(f"you identify as {gender}")
    if email:
        available_info.append(f"your email is {email}")
    
    if not available_info:
        return "🌟 I can see you're logged in, but I don't have much information about you yet! Please update your profile so I can provide you with personalized skincare advice! ✨"
    
    info_text = ", ".join(available_info)
    
    responses = [
        f"💖 Yes, I know you! Here's what I remember: {info_text}. I'm here to be your personal skincare companion! ✨",
        f"🌟 Of course I know you! I remember that {info_text}. I'm excited to help you with personalized beauty advice! 💫",
        f"🎀 Absolutely! I know that {info_text}. I'm here to make your skincare journey magical! 🌸",
        f"✨ Yes! I remember that {info_text}. I'm your beauty bestie, ready to help you glow! 💖",
        f"💫 Of course! I know that {info_text}. I'm here to provide you with the best skincare advice! 🌟"
    ]
    return random.choice(responses)

def get_default_response(name: str, age: str, gender: str, email: str) -> str:
    """Generate default responses for unrecognized queries"""
    if name:
        responses = [
            f"💖 Hello {name}! I'm here to help you with your skincare journey! What would you like to know about your profile or beauty routine? ✨",
            f"🌟 Hi {name}! I'm your personal skincare assistant! How can I help you today? 💫",
            f"🎀 Hey {name}! I'm excited to help you with your beauty needs! What can I assist you with? 🌸",
            f"✨ Hello {name}! I'm here to make your skincare journey amazing! What would you like to know? 💖",
            f"💫 Hi {name}! I'm your beauty companion! How can I help you today? 🌟"
        ]
    else:
        responses = [
            "💖 Hello there! I'm here to help you with your skincare journey! What would you like to know? ✨",
            "🌟 Hi! I'm your personal skincare assistant! How can I help you today? 💫",
            "🎀 Hey! I'm excited to help you with your beauty needs! What can I assist you with? 🌸",
            "✨ Hello! I'm here to make your skincare journey amazing! What would you like to know? 💖",
            "💫 Hi! I'm your beauty companion! How can I help you today? 🌟"
        ]
    
    return random.choice(responses) 