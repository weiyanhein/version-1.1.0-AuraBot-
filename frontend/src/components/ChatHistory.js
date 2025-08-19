import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { FiX, FiTrash2, FiEdit2, FiMessageSquare, FiPlus } from 'react-icons/fi';
import { getChatSessions, deleteChatSession, updateSessionTitle } from '../api';
import { getUserData } from '../utils/cookies';
import './ChatHistory.css';

const ChatHistory = ({ onClose, onSelectSession, onCreateNewChat }) => {
  const { darkMode } = useContext(ThemeContext);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSession, setEditingSession] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const colors = darkMode
    ? {
        primary: '#2d3748',
        secondary: '#4a5568',
        accent: '#4a5568',
        background: '#1a202c',
        text: '#e2e8f0',
        border: '#4a5568',
        hover: '#2d3748'
      }
    : {
        primary: '#FF4799',
        secondary: '#f1cfdeff',
        accent: '#d4b6c3ff',
        background: '#fac6e0ff',
        text: '#4A3A5A',
        border: '#d4b6c3ff',
        hover: '#f1cfdeff'
      };

  useEffect(() => {
    loadChatSessions();
  }, []);

  const loadChatSessions = async () => {
    try {
      setLoading(true);
      const userData = getUserData();
      if (!userData || !userData.email) {
        console.log('No user data found');
        setSessions([]);
        return;
      }

      const response = await getChatSessions(userData.email);
      setSessions(response.sessions || []);
    } catch (error) {
      console.error('Error loading chat sessions:', error);
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSession = async (sessionId) => {
    if (!window.confirm('Are you sure you want to delete this chat session?')) {
      return;
    }

    try {
      await deleteChatSession(sessionId);
      setSessions(sessions.filter(session => session.session_id !== sessionId));
    } catch (error) {
      console.error('Error deleting session:', error);
      alert('Failed to delete session');
    }
  };

  const handleEditSession = async (sessionId) => {
    if (!editTitle.trim()) {
      alert('Please enter a title');
      return;
    }

    try {
      await updateSessionTitle(sessionId, editTitle);
      setSessions(sessions.map(session => 
        session.session_id === sessionId 
          ? { ...session, title: editTitle }
          : session
      ));
      setEditingSession(null);
      setEditTitle('');
    } catch (error) {
      console.error('Error updating session title:', error);
      alert('Failed to update session title');
    }
  };

  const startEditing = (session) => {
    setEditingSession(session.session_id);
    setEditTitle(session.title);
  };

  const cancelEditing = () => {
    setEditingSession(null);
    setEditTitle('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="chat-history-overlay" style={{ backgroundColor: colors.background }}>
        <div className="chat-history-modal" style={{ backgroundColor: colors.secondary }}>
          <div className="loading">Loading chat history...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-history-overlay" style={{ backgroundColor: colors.background }}>
      <div className="chat-history-modal" style={{ backgroundColor: colors.secondary }}>
        <div className="chat-history-header" style={{ backgroundColor: colors.primary }}>
          <h2 style={{ color: colors.text }}>Chat History</h2>
          <button 
            onClick={onClose}
            className="close-button"
            style={{ color: colors.text }}
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="chat-history-content">
          <div className="new-chat-button-container">
            <button 
              onClick={onCreateNewChat}
              className="new-chat-button"
              style={{ 
                backgroundColor: colors.primary,
                color: colors.text,
                border: `1px solid ${colors.border}`
              }}
            >
              <FiPlus size={16} />
              New Chat
            </button>
          </div>

          {sessions.length === 0 ? (
            <div className="no-sessions" style={{ color: colors.text }}>
              <FiMessageSquare size={48} />
              <p>No chat history found</p>
              <p>Start a new conversation to see it here</p>
            </div>
          ) : (
            <div className="sessions-list">
              {sessions.map((session) => (
                <div 
                  key={session.session_id} 
                  className="session-item"
                  style={{ 
                    backgroundColor: colors.accent,
                    border: `1px solid ${colors.border}`,
                    color: colors.text
                  }}
                >
                  {editingSession === session.session_id ? (
                    <div className="edit-session">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        style={{ 
                          backgroundColor: colors.background,
                          color: colors.text,
                          border: `1px solid ${colors.border}`
                        }}
                        autoFocus
                      />
                      <div className="edit-actions">
                        <button 
                          onClick={() => handleEditSession(session.session_id)}
                          style={{ backgroundColor: colors.primary, color: colors.text }}
                        >
                          Save
                        </button>
                        <button 
                          onClick={cancelEditing}
                          style={{ backgroundColor: colors.secondary, color: colors.text }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div 
                        className="session-info"
                        onClick={() => onSelectSession(session)}
                        style={{ cursor: 'pointer' }}
                      >
                        <h3>{session.title}</h3>
                        <p>{formatDate(session.updated_at)}</p>
                        <p>{session.message_count} messages</p>
                      </div>
                      <div className="session-actions">
                        <button 
                          onClick={() => startEditing(session)}
                          className="edit-button"
                          style={{ color: colors.text }}
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteSession(session.session_id)}
                          className="delete-button"
                          style={{ color: colors.text }}
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
