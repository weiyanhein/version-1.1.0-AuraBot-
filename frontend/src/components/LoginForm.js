
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FiMail, FiLock, FiEye, FiEyeOff, FiX, FiHeart } from 'react-icons/fi';
// import './LoginForm.css';
// import BeautyForm from './BeautyForm';
// import { setUserData } from '../utils/cookies';

// const LoginForm = ({ onClose, onLoginSuccess }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSignupForm, setShowSignupForm] = useState(false);

//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [forgotEmail, setForgotEmail] = useState('');
//   const [secretAnswer, setSecretAnswer] = useState('');
//   const [resetAllowed, setResetAllowed] = useState(false);
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmNewPassword, setConfirmNewPassword] = useState('');
//   const [forgotSuccess, setForgotSuccess] = useState('');
//   const [forgotError, setForgotError] = useState(''); // NEW: for modal-specific errors

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     if (!formData.email || !formData.password) {
//       setError('Please fill in all fields');
//       return;
//     }

//     if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       setError('Please enter a valid email address');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await fetch('http://localhost:8000/usersignuplogin', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || 'Login failed.');
//       }

//       const data = await response.json();
      
//       // Store user data in cookies
//       const userData = {
//         name: data.user.name,
//         email: formData.email, // Add email to the user data
//         age: data.user.age,
//         gender: data.user.gender,
//       };
//       setUserData(userData);
      
//       // Call the success callback to close the modal
//       if (onLoginSuccess) {
//         onLoginSuccess(userData);
//       }
      
//       // Navigate to chat page with user data
//       navigate('/chat', {
//         state: {
//           userData: userData
//         }
//       });
//     } catch (err) {
//       setError(err.message || 'Login failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleForgotPassword = async () => {
//     setError('');
//     setForgotError('');
//     setForgotSuccess('');
//     if (!forgotEmail || !/\S+@\S+\.\S+/.test(forgotEmail)) {
//       setForgotError('Please enter a valid email address');
//       return;
//     }
//     if (!secretAnswer.trim()) {
//       setForgotError('Please enter your favourite cosmetic brand');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:8000/forgot-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: forgotEmail, secret: secretAnswer }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || 'Failed to verify.');
//       }

//       setResetAllowed(true);
//       setForgotSuccess('Verified! You can now reset your password.');
//     } catch (err) {
//       setForgotError(err.message);
//       setSecretAnswer(''); // Clear the secret answer field on error to remove memory
//     }
//   };

//   const handleResetPassword = async () => {
//     setForgotError('');
//     if (newPassword.length < 8) {
//       setForgotError('Password must be at least 8 characters');
//       return;
//     }
//     if (newPassword !== confirmNewPassword) {
//       setForgotError('Passwords do not match');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:8000/update-password', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: forgotEmail,
//           new_password: newPassword,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || 'Password update failed.');
//       }

//       setForgotSuccess('Password updated successfully!');
//       setShowForgotPassword(false);
//     } catch (err) {
//       setForgotError(err.message);
//     }
//   };

//   if (showSignupForm) return <BeautyForm onClose={() => setShowSignupForm(false)} onShowLogin={() => setShowSignupForm(false)} />;

//   return (
//     <div className="login-modal-overlay">
//       <div className="login-modal">
//         <button className="close-btn" onClick={onClose}><FiX size={24} /></button>
//         <div className="login-header">
//           <h2>Welcome Back</h2>
//           <p>Sign in to continue your beauty journey</p>
//         </div>

//         {error && <div className="error-message">{error}</div>}
//         {forgotSuccess && <div className="success-message">{forgotSuccess}</div>}

//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="form-group">
//             <label>Email</label>
//             <div className="input-wrapper">
//               <FiMail className="input-icon" />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="your@email.com"
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Password</label>
//             <div className="input-wrapper">
//               <FiLock className="input-icon" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="••••••••"
//                 required
//               />
//               <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
//                 {showPassword ? <FiEye /> : <FiEyeOff />}
//               </button>
//             </div>
//           </div>

//           <div className="form-options">
//             <button type="button" className="forgot-password" onClick={() => setShowForgotPassword(true)}>
//               Forgot password?
//             </button>
//           </div>

//           <button type="submit" className="login-btn" disabled={isLoading}>
//             {isLoading ? 'Signing in...' : 'Log In'}
//           </button>

//           <div className="signup-link">
//             Create new account?
//             <button type="button" onClick={() => setShowSignupForm(true)}>Sign up</button>
//           </div>
//         </form>
//       </div>

//       {/* Forgot Password Modal */}
//       {showForgotPassword && (
//         <div className="forgot-modal-overlay">
//           <div className="forgot-modal-content">
//             <h3>Forgot Password</h3>
//             {!resetAllowed ? (
//               <>
//                 <p>Enter your email and your favourite cosmetic brand</p>
//                 {forgotError && <div className="error-message">{forgotError}</div>}

//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   value={forgotEmail}
//                   onChange={(e) => setForgotEmail(e.target.value)}
//                   className="forgot-input"
//                 />

//                 <div className="beauty-form-group">
//                   <div className="beauty-input-container">
//                     <FiHeart className="beauty-input-icon" />
//                     <input
//                       id="secret"
//                       type="text"
//                       name="secret"
//                       value={secretAnswer}
//                       onChange={(e) => setSecretAnswer(e.target.value)}
//                       placeholder="Please enter favourite cosmetic brand"
//                       className="beauty-input"
//                     />
//                   </div>
//                 </div>

//                 <div className="modal-button-group">
//                   <button onClick={handleForgotPassword}>Verify</button>
//                   <button onClick={() => {
//                     setShowForgotPassword(false);
//                     setResetAllowed(false);
//                     setForgotEmail('');
//                     setSecretAnswer('');
//                     setForgotError('');
//                   }}>Cancel</button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <p>Set your new password</p>
//                 {forgotError && <div className="error-message">{forgotError}</div>}
//                 <input
//                   type="password"
//                   placeholder="New password"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   className="forgot-input"
//                 />
//                 <input
//                   type="password"
//                   placeholder="Confirm new password"
//                   value={confirmNewPassword}
//                   onChange={(e) => setConfirmNewPassword(e.target.value)}
//                   className="forgot-input"
//                 />
//                 <div className="modal-button-group">
//                   <button onClick={handleResetPassword}>Reset Password</button>
//                   <button onClick={() => {
//                     setShowForgotPassword(false);
//                     setResetAllowed(false);
//                     setForgotEmail('');
//                     setSecretAnswer('');
//                     setNewPassword('');
//                     setConfirmNewPassword('');
//                     setForgotError('');
//                   }}>Cancel</button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LoginForm;
// // 


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiX, FiHeart, FiCheckCircle } from 'react-icons/fi';
import './LoginForm.css';
import BeautyForm from './BeautyForm';
import { setUserData } from '../utils/cookies';

const LoginForm = ({ onClose, onLoginSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  // NEW: State for the success modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [secretAnswer, setSecretAnswer] = useState('');
  const [resetAllowed, setResetAllowed] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [forgotError, setForgotError] = useState(''); // NEW: for modal-specific errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/usersignuplogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed.');
      }

      const data = await response.json();

      // Store user data in cookies
      const userData = {
        name: data.user.name,
        email: formData.email, // Add email to the user data
        age: data.user.age,
        gender: data.user.gender,
      };
      setUserData(userData);
      
      // Call the success callback to close the modal
      if (onLoginSuccess) {
        onLoginSuccess(userData);
      }

      // Show the success modal instead of navigating immediately
      setShowSuccessModal(true);
      
      // Navigate to chat page after a delay
      setTimeout(() => {
        navigate('/chat', {
          state: {
            userData: userData
          }
        });
      }, 2000); // Wait for 2 seconds before navigating
      
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError('');
    setForgotError('');
    setForgotSuccess('');
    if (!forgotEmail || !/\S+@\S+\.\S+/.test(forgotEmail)) {
      setForgotError('Please enter a valid email address');
      return;
    }
    if (!secretAnswer.trim()) {
      setForgotError('Please enter your favourite cosmetic brand');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail, secret: secretAnswer }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to verify.');
      }

      setResetAllowed(true);
      setForgotSuccess('Verified! You can now reset your password.');
    } catch (err) {
      setForgotError(err.message);
      setSecretAnswer(''); // Clear the secret answer field on error to remove memory
    }
  };

  const handleResetPassword = async () => {
    setForgotError('');
    if (newPassword.length < 8) {
      setForgotError('Password must be at least 8 characters');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setForgotError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/update-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: forgotEmail,
          new_password: newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Password update failed.');
      }

      setForgotSuccess('Password updated successfully!');
      setShowForgotPassword(false);
    } catch (err) {
      setForgotError(err.message);
    }
  };

  if (showSignupForm) return <BeautyForm onClose={() => setShowSignupForm(false)} onShowLogin={() => setShowSignupForm(false)} />;

  return (
    <div className="login-modal-overlay">
      <div className="login-modal">
        <button className="close-btn" onClick={onClose}><FiX size={24} /></button>
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to continue your beauty journey</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {forgotSuccess && <div className="success-message">{forgotSuccess}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <FiMail className="input-icon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>
          </div>

          <div className="form-options">
            <button type="button" className="forgot-password" onClick={() => setShowForgotPassword(true)}>
              Forgot password?
            </button>
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Log In'}
          </button>

          <div className="signup-link">
            Create new account?
            <button type="button" onClick={() => setShowSignupForm(true)}>Sign up</button>
          </div>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="forgot-modal-overlay">
          <div className="forgot-modal-content">
            <h3>Forgot Password</h3>
            {!resetAllowed ? (
              <>
                <p>Enter your email and your favourite cosmetic brand</p>
                {forgotError && <div className="error-message">{forgotError}</div>}

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="forgot-input"
                />

                <div className="beauty-form-group">
                  <div className="beauty-input-container">
                    <FiHeart className="beauty-input-icon" />
                    <input
                      id="secret"
                      type="text"
                      name="secret"
                      value={secretAnswer}
                      onChange={(e) => setSecretAnswer(e.target.value)}
                      placeholder="Please enter favourite cosmetic brand"
                      className="beauty-input"
                    />
                  </div>
                </div>

                <div className="modal-button-group">
                  <button onClick={handleForgotPassword}>Verify</button>
                  <button onClick={() => {
                    setShowForgotPassword(false);
                    setResetAllowed(false);
                    setForgotEmail('');
                    setSecretAnswer('');
                    setForgotError('');
                  }}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <p>Set your new password</p>
                {forgotError && <div className="error-message">{forgotError}</div>}
                <input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="forgot-input"
                />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="forgot-input"
                />
                <div className="modal-button-group">
                  <button onClick={handleResetPassword}>Reset Password</button>
                  <button onClick={() => {
                    setShowForgotPassword(false);
                    setResetAllowed(false);
                    setForgotEmail('');
                    setSecretAnswer('');
                    setNewPassword('');
                    setConfirmNewPassword('');
                    setForgotError('');
                  }}>Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* NEW: Success Pop-up Modal */}
      {showSuccessModal && (
        <div className="login-modal-overlay success-overlay">
          <div className="login-modal success-modal">
            <FiCheckCircle size={50} color="#4CAF50" />
            <h3>Login Successful!</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
