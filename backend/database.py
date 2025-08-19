from pymongo import MongoClient
from backend.config import Config

# Use configuration from config.py and .env
client = MongoClient(Config.MONGO_DB_CONNECTION_STRING)
db = client[Config.MONGO_DB_NAME]
user_collection = db["users"]

# Chat history collections
chat_sessions_collection = db["chat_sessions"]
chat_messages_collection = db["chat_messages"]

# Create indexes safely (only if they don't exist)
try:
    user_collection.create_index("email", unique=True)
    chat_sessions_collection.create_index("user_email")
    chat_sessions_collection.create_index("session_id", unique=True)
    chat_messages_collection.create_index("session_id")
    chat_messages_collection.create_index("user_email")
    chat_messages_collection.create_index("timestamp")
except Exception as e:
    # Index might already exist, which is fine
    pass





