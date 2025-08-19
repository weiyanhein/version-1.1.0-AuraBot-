#!/usr/bin/env python3
"""
Test script for the User Identity Agent
This script tests the user identity agent functionality without needing the full backend setup.
"""

import json
from typing import Dict, Any

# Mock the ChatbotState and ChatbotResources for testing
class MockChatbotResources:
    def __init__(self):
        pass

def user_identity_agent(state: Dict[str, Any], resources) -> Dict[str, Any]:
    """
    Handles user identity queries like "do you know me" or "who am i".
    Retrieves user information from the state and provides personalized responses.
    """
    user_message = state.get("user_message", "").strip()
    user_data = state.get("user_data", None)
    
    print(f"User Identity Agent activated for user message: '{user_message}'")
    print(f"User data available: {user_data is not None}")

    if not user_data:
        # No user data available - user is not logged in
        response = (
            "I don't have your information yet! 😊 To get personalized responses, "
            "please log in or create an account. Once you're logged in, I'll be able "
            "to remember your details and provide you with personalized skincare advice."
        )
    else:
        # User data is available - provide personalized response
        name = user_data.get("name", "there")
        age = user_data.get("age", "")
        gender = user_data.get("gender", "")
        email = user_data.get("email", "")
        
        # Create a personalized response based on available data
        if name and name != "":
            greeting = f"Hello {name}! 💖"
        else:
            greeting = "Hello there! 💖"
        
        # Build the response with available information
        info_parts = []
        
        if age:
            info_parts.append(f"you're {age} years old")
        
        if gender:
            info_parts.append(f"you identify as {gender}")
        
        if email:
            info_parts.append(f"your email is {email}")
        
        if info_parts:
            info_text = ", ".join(info_parts)
            response = (
                f"{greeting} Yes, I know you! Here's what I remember about you: "
                f"{info_text}. I'm here to help you with personalized skincare advice "
                f"and recommendations based on your profile. How can I assist you today?"
            )
        else:
            response = (
                f"{greeting} I can see you're logged in, but I don't have much "
                f"information about you yet. Feel free to ask me about skincare "
                f"products, routines, or any beauty questions you have!"
            )

    state['response'] = response
    state['intent'] = "user_identity_query"
    
    print(f"User Identity Agent response: {response}")
    return state

def test_user_identity_agent():
    """Test the user identity agent with different scenarios"""
    
    resources = MockChatbotResources()
    
    # Test 1: No user data (not logged in)
    print("\n=== Test 1: No user data ===")
    state1 = {
        "user_message": "do you know me?",
        "user_data": None
    }
    result1 = user_identity_agent(state1, resources)
    print(f"Response: {result1['response']}")
    
    # Test 2: User data with full information
    print("\n=== Test 2: Full user data ===")
    state2 = {
        "user_message": "who am i?",
        "user_data": {
            "name": "Sarah Johnson",
            "age": 28,
            "gender": "female",
            "email": "sarah.johnson@email.com"
        }
    }
    result2 = user_identity_agent(state2, resources)
    print(f"Response: {result2['response']}")
    
    # Test 3: User data with partial information
    print("\n=== Test 3: Partial user data ===")
    state3 = {
        "user_message": "what do you know about me?",
        "user_data": {
            "name": "Mike",
            "age": "",
            "gender": "",
            "email": "mike@email.com"
        }
    }
    result3 = user_identity_agent(state3, resources)
    print(f"Response: {result3['response']}")
    
    # Test 4: Different identity query
    print("\n=== Test 4: Different query ===")
    state4 = {
        "user_message": "my profile",
        "user_data": {
            "name": "Alex",
            "age": 25,
            "gender": "male",
            "email": "alex@email.com"
        }
    }
    result4 = user_identity_agent(state4, resources)
    print(f"Response: {result4['response']}")

if __name__ == "__main__":
    test_user_identity_agent() 