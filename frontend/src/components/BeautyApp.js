// import { useState } from 'react';
// import LoginForm from './LoginForm';
// import BeautyForm from './BeautyForm';


// function App() {
//   const [currentForm, setCurrentForm] = useState('login');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showModal, setShowModal] = useState(true);

//   const handleLoginSuccess = () => {
//     setIsLoggedIn(true);
//     setShowModal(false);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div className="app">
//       {isLoggedIn ? (
//         <div className="app-content">
//           <h1>Welcome to GlowUp Beauty</h1>
//         </div>
//       ) : showModal ? (
//         currentForm === 'login' ? (
//           <LoginForm
//             onClose={handleCloseModal}
//             onShowSignup={() => setCurrentForm('signup')}
//             onLoginSuccess={handleLoginSuccess}
//           />
//         ) : (
//           <BeautyForm
//             onClose={handleCloseModal}
//             onShowLogin={() => setCurrentForm('login')}
//           />
//         )
//       ) : (
//         <button
//           className="show-auth-button"
//           onClick={() => setShowModal(true)}
//         >
//           Show Login/Signup
//         </button>
//       )}
//     </div>
//   );
// }

// export default App;


// // //my new login form testing 
// // import React, { useState, useContext } from 'react';
// // import LoginForm from './LoginForm.js'; // Assuming .js extension is needed for direct import
// // import BeautyForm from './BeautyForm.js'; // Assuming .js extension is needed for direct import
// // import ChatBot from './ChatBot.js'; // Assuming ChatBot.js exists in your project
// // import { ThemeContext } from './ThemeContext.js'; // Assuming ThemeContext.js exists in your project

// // // Main application component
// // function App() {
// //   const [currentForm, setCurrentForm] = useState('login'); // 'login' or 'signup'
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [userData, setUserData] = useState(null); // To store logged-in user data
// //   const [showModal, setShowModal] = useState(true); // Controls visibility of the login/signup modal

// //   // Access dark mode state and toggle function from ThemeContext
// //   const { darkMode, toggleDarkMode } = useContext(ThemeContext);

// //   // Handles successful login from LoginForm
// //   const handleLoginSuccess = (data) => {
// //     setIsLoggedIn(true);
// //     // Backend's /usersignuplogin endpoint returns user data under a 'user' key
// //     setUserData(data.user);
// //     setShowModal(false); // Close the modal after successful login
// //     console.log('Login successful:', data.user);
// //     // In a production app, you would typically store JWT tokens (e.g., in localStorage) here
// //   };

// //   // Handles successful signup from BeautyForm
// //   const handleSignupSuccess = () => {
// //     // After successful signup, switch to the login form and prompt user to log in
// //     setCurrentForm('login');
// //     alert('Registration successful! Please log in with your new account.'); // Consider a custom modal instead of alert
// //   };

// //   // Handles user logout (also used to close ChatBot)
// //   const handleLogout = () => {
// //     setIsLoggedIn(false);
// //     setUserData(null);
// //     setShowModal(true); // Show the auth modal again after logout
// //     setCurrentForm('login'); // Reset to login form
// //     // Clear any stored tokens or session data here
// //     console.log('Logged out');
// //   };

// //   // Placeholder for Forgot Password flow (triggered from LoginForm)
// //   const handleForgotPassword = () => {
// //     alert('Forgot Password clicked! (You can implement a dedicated modal or page here)');
// //     // This would typically trigger a call to your FastAPI /forgot-password endpoint
// //   };

// //   // Placeholder for OAuth Login flow (Google/Facebook, triggered from BeautyForm)
// //   const handleOAuthLogin = (provider) => {
// //     alert(`OAuth Login with ${provider} clicked! (Implement your OAuth redirection here)`);
// //     // This would typically redirect the user to the OAuth provider's login page,
// //     // which then redirects back to your backend's /oauth-auth endpoint.
// //   };

// //   // Placeholder for Update Profile flow (for logged-in users)
// //   const handleUpdateProfile = () => {
// //     alert('Update Profile clicked! (Implement your profile update form here)');
// //     // This would involve fetching current user data, allowing edits, and calling your FastAPI /update-profile endpoint.
// //   };

// //   return (
// //     // Apply dark-mode class to the root app div
// //     <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
// //       {isLoggedIn ? (
// //         // Content displayed when the user is logged in: Show the ChatBot
// //         <ChatBot userData={userData} onClose={handleLogout} />
// //       ) : showModal ? (
// //         // Display login or signup modal if not logged in and modal is shown
// //         currentForm === 'login' ? (
// //           <LoginForm
// //             onClose={() => setShowModal(false)}
// //             onShowSignup={() => setCurrentForm('signup')} // Callback to switch to signup form
// //             onLoginSuccess={handleLoginSuccess}
// //             onForgotPassword={handleForgotPassword} // Pass handler for forgot password
// //           />
// //         ) : (
// //           <BeautyForm
// //             onClose={() => setShowModal(false)}
// //             onShowLogin={() => setCurrentForm('login')} // Callback to switch back to login form
// //             onSignupSuccess={handleSignupSuccess}
// //             onOAuthLogin={handleOAuthLogin} // Pass handler for OAuth login
// //           />
// //         )
// //       ) : (
// //         // Button to show login/signup modal if not logged in and modal is hidden
// //         <button
// //           className="show-auth-button"
// //           onClick={() => setShowModal(true)}
// //         >
// //           Show Login/Signup
// //         </button>
// //       )}

// //       {/* Theme Toggle Button - Can be placed anywhere, e.g., top-right corner */}
// //       <button
// //         onClick={toggleDarkMode}
// //         className="theme-toggle-button"
// //       >
// //         {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
// //       </button>
// //     </div>
// //   );
// // }

// // export default App;
import { useState } from 'react';
import LoginForm from './LoginForm';
import BeautyForm from './BeautyForm';


function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="app">
      {isLoggedIn ? (
        <div className="app-content">
          <h1>Welcome to GlowUp Beauty</h1>
        </div>
      ) : showModal ? (
        currentForm === 'login' ? (
          <LoginForm
            onClose={handleCloseModal}
            onShowSignup={() => setCurrentForm('signup')}
            onLoginSuccess={handleLoginSuccess}
          />
        ) : (
          <BeautyForm
            onClose={handleCloseModal}
            onShowLogin={() => setCurrentForm('login')}
          />
        )
      ) : (
        <button
          className="show-auth-button"
          onClick={() => setShowModal(true)}
        >
          Show Login/Signup
        </button>
      )}
    </div>
  );
}

export default App;