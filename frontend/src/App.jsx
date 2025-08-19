
import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import { ThemeProvider } from './components/ThemeContext';
import { FooterProvider } from './components/FooterContext';
import Footer from './components/Footer';
import './App.css';

const BeautyApp = lazy(() => import('./components/BeautyApp'));
const ProductsPage = lazy(() => import('./components/ProductsPage'));
const ChatBotPage = lazy(() => import('./components/ChatBotPage'));

const App = () => {
  const [showBeautyApp, setShowBeautyApp] = useState(false);
  const [showGlobalLoginForm, setShowGlobalLoginForm] = useState(false);

  // Define a simple onLoginSuccess handler for the LoginForm
  const handleLoginSuccess = (userData) => {
    console.log('User logged in successfully:', userData);
    setShowGlobalLoginForm(false);
  };

  return (
    <ThemeProvider>
      <FooterProvider>
        <Router>
          <div className="app-container" id="root-theme-container">
            <div className="global-background"></div>
            <Routes>
              {/* Route for ChatBotPage - does not include NavBar/Footer */}
              <Route path="/chat" element={
                <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
                  <ChatBotPage />
                </Suspense>
              } />
              
              {/* Other routes with NavBar and Footer */}
              <Route path="/products" element={
                <>  
                  <NavBar onShowLoginForm={() => setShowGlobalLoginForm(true)} />
                  <div className="content-wrapper">
                    <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
                      <ProductsPage />
                    </Suspense>
                  </div>
                  <Footer />
                </>
              } />

              <Route path="/services" element={
                <>
                  <NavBar onShowLoginForm={() => setShowGlobalLoginForm(true)} />
                  <div className="content-wrapper">
                    <HomePage />
                  </div>
                  <Footer />
                </>
              } />

              <Route path="/about" element={
                <>
                  <NavBar onShowLoginForm={() => setShowGlobalLoginForm(true)} />
                  <div className="content-wrapper">
                    <HomePage />
                  </div>
                  <Footer />
                </>
              } />

              <Route path="/contact" element={
                <>
                  <NavBar onShowLoginForm={() => setShowGlobalLoginForm(true)} />
                  <div className="content-wrapper">
                    <HomePage />
                  </div>
                  <Footer />
                </>
              } />

              {/* Default Home Page Route */}
              <Route path="/" element={
                !showBeautyApp ? (
                  <>
                    <NavBar onShowLoginForm={() => setShowGlobalLoginForm(true)} />
                    <div className="content-wrapper">
                      <HomePage onShowBeautyApp={() => setShowBeautyApp(true)} />
                    </div>
                    <Footer />
                  </>
                ) : (
                  <BeautyApp onClose={() => setShowBeautyApp(false)} />
                )
              } />
            </Routes>
            
          
          </div>
        </Router>
      </FooterProvider>
    </ThemeProvider>
  );
};

export default App;