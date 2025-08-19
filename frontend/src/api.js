// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchData = () => API.get('/data');
export const createData = (newData) => API.post('/data', newData);

// Chat History API functions
export const createChatSession = async (userEmail, title = null) => {
  try {
    const response = await fetch(`${API.defaults.baseURL}/chat/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_email: userEmail,
        title: title
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create chat session');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating chat session:', error);
    throw error;
  }
};

export const getChatSessions = async (userEmail) => {
  try {
    const response = await fetch(`${API.defaults.baseURL}/chat/sessions/${encodeURIComponent(userEmail)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch chat sessions');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching chat sessions:', error);
    throw error;
  }
};

export const getSessionMessages = async (sessionId) => {
  try {
    const response = await fetch(`${API.defaults.baseURL}/chat/sessions/${sessionId}/messages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch session messages');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching session messages:', error);
    throw error;
  }
};

export const updateSessionTitle = async (sessionId, title) => {
  try {
    const response = await fetch(`${API.defaults.baseURL}/chat/sessions/${sessionId}/title`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId,
        title: title
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update session title');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating session title:', error);
    throw error;
  }
};

export const deleteChatSession = async (sessionId) => {
  try {
    const response = await fetch(`${API.defaults.baseURL}/chat/sessions/${sessionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete chat session');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting chat session:', error);
    throw error;
  }
};