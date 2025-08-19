import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ChatBot from './ChatBot';
import { ThemeProvider } from './ThemeContext';
import { getUserData, clearUserData } from '../utils/cookies';

const ChatBotPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Try to get user data from location state first (if navigated from form)
    if (location.state?.userData) {
      setUserData(location.state.userData);
    } else {
      // Try to get from cookies if no state
      const storedUserData = getUserData();
      if (storedUserData) {
        setUserData(storedUserData);
      } else {
        // If no user data, redirect to home
        navigate('/', { replace: true });
      }
    }
  }, [location.state, navigate]);

  const handleClose = () => {
    // Clear user data and redirect to home
    clearUserData();
    navigate('/', { replace: true });
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider>
      <ChatBot userData={userData} onClose={handleClose} />
    </ThemeProvider>
  );
};

export default ChatBotPage; 