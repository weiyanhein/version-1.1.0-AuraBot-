# AuraBot 1.1.0

AuraBot is an AI-powered chatbot designed to recommend personalized skincare treatments and provide comprehensive information about cosmetics, their usage, and effective care routines. Users can interact with AuraBot to ask questions related to skin care treatments, product recommendations, and cosmetic usage guidelines.

## Features

-AI chatbot for personalized skincare and cosmetics advice
- Natural language interaction to ask about treatments, ingredients, and usage
- Integrates Langchain and Langraph for multi-agent orchestration
- Maintains contextual understanding for accurate recommendations
- Backend powered by FastAPI for high-performance API handling
- Modular architecture with clear backend/frontend separation
- Supports both vector and MongoDB databases for flexible storage and retrieval

## Tech Stack

- Frontend: React (JavaScript)
- Backend: Python, FastAPI
- Databases: MongoDB & Vector Database
- AI/Agents: Langchain, Langraph




## Deployment

- You can deploy the backend and frontend separately  locally .


## How It Works

User can  interacts with the chatbot via the React frontend.
FastAPI  processes requests, handles conversational flows, and recommends skincare/cosmetics advice using AI models and multi-agent systems (Langchain & Langraph). 
Relevant data is retrieved from MongoDB and Chroma db (vector database) for RAG processing .



Before run to the program, in your machine need to download  ollama model mxbai-embed-large:335m,llama3:8b.
