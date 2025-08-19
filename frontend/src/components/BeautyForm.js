// // import React, { useState, useContext } from 'react';
// // import { ThemeContext } from './ThemeContext';
// // import { FiUser, FiLock, FiMail, FiCalendar, FiEye, FiEyeOff, FiX } from 'react-icons/fi';
// // import { FcGoogle } from 'react-icons/fc';
// // import { FaFacebook } from 'react-icons/fa';
// // import ChatBot from './ChatBot';
// // import './BeautyForm.css';

// // const BeautyForm = ({ onClose, onShowLogin }) => {
// //   const { darkMode } = useContext(ThemeContext);
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     age: '',
// //     gender: 'female',
// //     // skinType: 'normal',
// //     email: '',
// //     password: '',
// //     confirmPassword: ''
// //   });
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [errors, setErrors] = useState({});
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [showChatBot, setShowChatBot] = useState(false);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: name === 'age' ? (value === '' ? '' : Number(value)) : value
// //     }));
// //     if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};
// //     if (!formData.name.trim()) newErrors.name = 'Name is required';
// //     if (!formData.age) newErrors.age = 'Age is required';
// //     else if (formData.age < 13 || formData.age > 120) newErrors.age = 'Age must be between 13-120';
// //     if (!formData.email.trim()) newErrors.email = 'Email is required';
// //     else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
// //     if (!formData.password) newErrors.password = 'Password is required';
// //     else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
// //     if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (!validateForm()) return;

// //     setIsSubmitting(true);
// //     setShowChatBot(true);
// //     setIsSubmitting(false);
// //   };

// //   const handleOverlayClick = (e) => {
// //     if (e.target === e.currentTarget) onClose();
// //   };

// //   if (showChatBot) {
// //     return (
// //       <ChatBot
// //         userData={{
// //           name: formData.name,
// //           age: formData.age,
// //           gender: formData.gender,
// //           // skinType: formData.skinType
// //         }}
// //         onClose={() => {
// //           setShowChatBot(false);
// //           onClose();
// //         }}
// //       />
// //     );
// //   }

// //   return (
// //     <div className="beauty-modal-overlay" onClick={handleOverlayClick}>
// //       <div className={`beauty-login-card ${darkMode ? 'dark' : 'light'}`}>
// //         <button className="beauty-close-button" onClick={onClose}>
// //           <FiX />
// //         </button>
// //         <button className='beauty-back-button' onClick={() => onShowLogin && onShowLogin()}>
// //         </button>

// //         <div className="beauty-login-header">
// //           <div className="beauty-logo">
// //             <span className="beauty-logo-icon">🌸</span>
// //             <h1>AIBeauty</h1>
// //           </div>
// //           <h2>Create Your Account</h2>

// //         </div>

// //         {errors.form && (
// //           <div className="beauty-form-error">
// //             {errors.form}
// //           </div>
// //         )}

// //         <form onSubmit={handleSubmit} className="beauty-login-form">
// //           <div className={`beauty-form-group ${errors.name ? 'has-error' : ''}`}>
// //             <div className="beauty-input-container">
// //               <FiUser className="beauty-input-icon" />
// //               <input
// //                 id="name"
// //                 type="text"
// //                 name="name"
// //                 value={formData.name}
// //                 onChange={handleChange}
// //                 placeholder="Full Name"
// //                 className="beauty-input"
// //               />
// //             </div>
// //             {errors.name && (
// //               <span className="beauty-error-message">{errors.name}</span>
// //             )}
// //           </div>

// //           <div className={`beauty-form-group ${errors.age ? 'has-error' : ''}`}>
// //             <div className="beauty-input-container">
// //               <FiCalendar className="beauty-input-icon" />
// //               <input
// //                 id="age"
// //                 type="number"
// //                 name="age"
// //                 value={formData.age}
// //                 onChange={handleChange}
// //                 placeholder="Age (13-120)"
// //                 min="13"
// //                 max="120"
// //                 className="beauty-input"
// //               />
// //             </div>
// //             {errors.age && (
// //               <span className="beauty-error-message">{errors.age}</span>
// //             )}
// //           </div>

// //           <div className="beauty-form-group">
// //             <div className="beauty-input-container">
// //               <FiUser className="beauty-input-icon" />
// //               <select
// //                 id="gender"
// //                 name="gender"
// //                 value={formData.gender}
// //                 onChange={handleChange}
// //                 className="beauty-input"
// //               >
// //                 <option value="female">Female</option>
// //                 <option value="male">Male</option>
// //                 <option value="other">Other</option>
// //                 <option value="prefer-not-to-say">Prefer not to say</option>
// //               </select>
// //             </div>
// //           </div>

// //           {/* <div className="beauty-form-group">
// //             <div className="beauty-input-container">
// //               <FiUser className="beauty-input-icon" />
// //               <select
// //                 id="skinType"
// //                 name="skinType"
// //                 value={formData.skinType}
// //                 onChange={handleChange}
// //                 className="beauty-input"
// //               >
// //                 <option value="normal">Normal Skin</option>
// //                 <option value="dry">Dry Skin</option>
// //                 <option value="oily">Oily Skin</option>
// //                 <option value="combination">Combination Skin</option>
// //                 <option value="sensitive">Sensitive Skin</option>
// //               </select>
// //             </div>
// //           </div> */}

// //           <div className={`beauty-form-group ${errors.email ? 'has-error' : ''}`}>
// //             <div className="beauty-input-container">
// //               <FiMail className="beauty-input-icon" />
// //               <input
// //                 id="email"
// //                 type="email"
// //                 name="email"
// //                 value={formData.email}
// //                 onChange={handleChange}
// //                 placeholder="Email Address"
// //                 className="beauty-input"
// //               />
// //             </div>
// //             {errors.email && (
// //               <span className="beauty-error-message">{errors.email}</span>
// //             )}
// //           </div>

// //           <div className={`beauty-form-group ${errors.password ? 'has-error' : ''}`}>
// //             <div className="beauty-input-container">
// //               <FiLock className="beauty-input-icon" />
// //               <input
// //                 id="password"
// //                 type={showPassword ? "text" : "password"}
// //                 name="password"
// //                 value={formData.password}
// //                 onChange={handleChange}
// //                 placeholder="Password (8+ characters)"
// //                 className="beauty-input"
// //               />
// //               <button
// //                 type="button"
// //                 className="beauty-password-toggle"
// //                 onClick={() => setShowPassword(!showPassword)}
// //                 aria-label={showPassword ? "Hide password" : "Show password"}
// //               >
// //                 {showPassword ? <FiEyeOff /> : <FiEye />}
// //               </button>
// //             </div>
// //             {errors.password && (
// //               <span className="beauty-error-message">{errors.password}</span>
// //             )}
// //           </div>

// //           <div className={`beauty-form-group ${errors.confirmPassword ? 'has-error' : ''}`}>
// //             <div className="beauty-input-container">
// //               <FiLock className="beauty-input-icon" />
// //               <input
// //                 id="confirmPassword"
// //                 type={showPassword ? "text" : "password"}
// //                 name="confirmPassword"
// //                 value={formData.confirmPassword}
// //                 onChange={handleChange}
// //                 placeholder="Confirm Password"
// //                 className="beauty-input"
// //               />
// //             </div>
// //             {errors.confirmPassword && (
// //               <span className="beauty-error-message">{errors.confirmPassword}</span>
// //             )}
// //           </div>

// //           <div className="beauty-form-actions">
// //             <button
// //               type="submit"
// //               className="beauty-submit-button"
// //               disabled={isSubmitting}
// //             >
// //               {isSubmitting ? (
// //                 <span className="beauty-spinner"></span>
// //               ) : (
// //                 'Login'
// //               )}
// //             </button>
// //             <button
// //               type="button"
// //               className="beauty-cancel-button"
// //               onClick={onClose}
// //               disabled={isSubmitting}
// //             >
// //               Cancel
// //             </button>
// //           </div>
// //         </form>

// //         <div className="beauty-social-divider">
// //           <span>or sign up with</span>
// //         </div>

// //         <div className="beauty-social-buttons">
// //           <button
// //             type="button"
// //             className="beauty-social-button beauty-google-button"
// //             onClick={() => console.log('Google sign up')}
// //           >
// //             <FcGoogle className="beauty-social-icon" />
// //             Google
// //           </button>
// //           <button
// //             type="button"
// //             className="beauty-social-button beauty-facebook-button"
// //             onClick={() => console.log('Facebook sign up')}
// //           >
// //             <FaFacebook className="beauty-social-icon" />
// //             Facebook
// //           </button>
// //         </div>

// //         {/* <div className="beauty-form-footer">
// //           <p>Already have an account? <button type="button" className="beauty-text-button">Sign in</button></p>
// //         </div> */}
// //       </div>
// //     </div>
// //   );
// // };

// // export default BeautyForm;


// // // my login testing 


// // // import React, { useState, useContext } from 'react';
// // // import { ThemeContext } from './ThemeContext.js'; // Assuming ThemeContext.js exists
// // // import { FiUser, FiLock, FiMail, FiCalendar, FiEye, FiEyeOff, FiX } from 'react-icons/fi';
// // // import { FaGoogle, FaFacebook } from 'react-icons/fa'; // Import FaFacebook correctly
// // // import './BeautyForm.css'; // Your existing CSS file for BeautyForm

// // // // BeautyForm component for user registration (signup)
// // // const BeautyForm = ({ onClose, onSignupSuccess, onShowLogin, onOAuthLogin }) => {
// // //   const { darkMode } = useContext(ThemeContext); // Re-integrated darkMode
// // //   const [formData, setFormData] = useState({
// // //     name: '',
// // //     age: '',
// // //     gender: 'female', // Default value
// // //     // skin_type: 'normal', // REMOVED from formData state
// // //     email: '',
// // //     password: '',
// // //     confirmPassword: ''
// // //   });
// // //   const [showPassword, setShowPassword] = useState(false);
// // //   const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password toggle
// // //   const [errors, setErrors] = useState({});
// // //   const [isSubmitting, setIsSubmitting] = useState(false);

// // //   // Handles input field changes
// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       [name]: name === 'age' ? (value === '' ? '' : Number(value)) : value // Convert age to number
// // //     }));
// // //     // Clear error for the field being changed
// // //     if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
// // //   };

// // //   // Client-side form validation
// // //   const validateForm = () => {
// // //     const newErrors = {};
// // //     if (!formData.name.trim()) newErrors.name = 'Name is required';
// // //     if (!formData.age) newErrors.age = 'Age is required';
// // //     else if (formData.age < 13 || formData.age > 120) newErrors.age = 'Age must be between 13-120';
// // //     if (!formData.email.trim()) newErrors.email = 'Email is required';
// // //     else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
// // //     if (!formData.password) newErrors.password = 'Password is required';
// // //     else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
// // //     if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

// // //     setErrors(newErrors);
// // //     return Object.keys(newErrors).length === 0; // Return true if no errors
// // //   };

// // //   // Handles form submission for signup
// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     if (!validateForm()) return; // Stop if client-side validation fails

// // //     setIsSubmitting(true); // Show loading indicator
// // //     setErrors({}); // Clear previous form-level errors

// // //     try {
// // //       // Construct payload matching your backend's UserSignUpRegister Pydantic model.
// // //       // skin_type is REMOVED from payload.
// // //       const signupPayload = {
// // //         name: formData.name,
// // //         age: formData.age,
// // //         gender: formData.gender,
// // //         email: formData.email,
// // //         password: formData.password,
// // //         confirm_password: formData.confirmPassword // Ensure this matches your backend model field name
// // //       };

// // //       const response = await fetch('http://localhost:8000/usersignupregister', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify(signupPayload),
// // //       });

// // //       if (!response.ok) {
// // //         const errorData = await response.json();
// // //         throw new Error(errorData.detail || 'Registration failed.');
// // //       }

// // //       const data = await response.json();
// // //       console.log('Signup successful:', data);
// // //       onSignupSuccess(); // Call parent handler on successful signup
// // //     } catch (err) {
// // //       setErrors({ form: err.message || 'Registration failed. Please try again.' });
// // //     } finally {
// // //       setIsSubmitting(false); // Hide loading indicator
// // //     }
// // //   };

// // //   // Handles clicks on the modal overlay to close it
// // //   const handleOverlayClick = (e) => {
// // //     if (e.target === e.currentTarget) onClose();
// // //   };

// // //   return (
// // //     <div className="beauty-modal-overlay" onClick={handleOverlayClick}>
// // //       <div className={`beauty-login-card ${darkMode ? 'dark' : 'light'}`}> {/* Apply dark/light class */}
// // //         <button className="beauty-close-button" onClick={onClose}>
// // //           <FiX />
// // //         </button>
// // //         {/* Button to switch back to login form */}
// // //         <button className='beauty-back-button' onClick={onShowLogin}>
// // //           Back to Login
// // //         </button>

// // //         <div className="beauty-login-header">
// // //           <div className="beauty-logo">
// // //             <span className="beauty-logo-icon">🌸</span>
// // //             <h1>AIBeauty</h1>
// // //           </div>
// // //           <h2>Create Your Account</h2>
// // //         </div>

// // //         {errors.form && (
// // //           <div className="beauty-form-error">
// // //             {errors.form}
// // //           </div>
// // //         )}

// // //         <form onSubmit={handleSubmit} className="beauty-login-form">
// // //           <div className={`beauty-form-group ${errors.name ? 'has-error' : ''}`}>
// // //             <div className="beauty-input-container">
// // //               <FiUser className="beauty-input-icon" />
// // //               <input
// // //                 id="name"
// // //                 type="text"
// // //                 name="name"
// // //                 value={formData.name}
// // //                 onChange={handleChange}
// // //                 placeholder="Full Name"
// // //                 className="beauty-input"
// // //               />
// // //             </div>
// // //             {errors.name && (
// // //               <span className="beauty-error-message">{errors.name}</span>
// // //             )}
// // //           </div>

// // //           <div className={`beauty-form-group ${errors.age ? 'has-error' : ''}`}>
// // //             <div className="beauty-input-container">
// // //               <FiCalendar className="beauty-input-icon" />
// // //               <input
// // //                 id="age"
// // //                 type="number"
// // //                 name="age"
// // //                 value={formData.age}
// // //                 onChange={handleChange}
// // //                 placeholder="Age (13-120)"
// // //                 min="13"
// // //                 max="120"
// // //                 className="beauty-input"
// // //               />
// // //             </div>
// // //             {errors.age && (
// // //               <span className="beauty-error-message">{errors.age}</span>
// // //             )}
// // //           </div>

// // //           <div className="beauty-form-group">
// // //             <div className="beauty-input-container">
// // //               <FiUser className="beauty-input-icon" /> {/* Reusing FiUser for consistency */}
// // //               <select
// // //                 id="gender"
// // //                 name="gender"
// // //                 value={formData.gender}
// // //                 onChange={handleChange}
// // //                 className="beauty-input"
// // //               >
// // //                 <option value="female">Female</option>
// // //                 <option value="male">Male</option>
// // //                 <option value="other">Other</option>
// // //                 <option value="prefer-not-to-say">Prefer not to say</option>
// // //               </select>
// // //             </div>
// // //           </div>

// // //           {/* skin_type field is REMOVED from the form */}
// // //           {/*
// // //           <div className="beauty-form-group">
// // //             <div className="beauty-input-container">
// // //               <FiUser className="beauty-input-icon" />
// // //               <select
// // //                 id="skin_type"
// // //                 name="skin_type"
// // //                 value={formData.skin_type}
// // //                 onChange={handleChange}
// // //                 className="beauty-input"
// // //               >
// // //                 <option value="normal">Normal Skin</option>
// // //                 <option value="dry">Dry Skin</option>
// // //                 <option value="oily">Oily Skin</option>
// // //                 <option value="combination">Combination Skin</option>
// // //                 <option value="sensitive">Sensitive Skin</option>
// // //               </select>
// // //             </div>
// // //           </div>
// // //           */}

// // //           <div className={`beauty-form-group ${errors.email ? 'has-error' : ''}`}>
// // //             <div className="beauty-input-container">
// // //               <FiMail className="beauty-input-icon" />
// // //               <input
// // //                 id="email"
// // //                 type="email"
// // //                 name="email"
// // //                 value={formData.email}
// // //                 onChange={handleChange}
// // //                 placeholder="Email Address"
// // //                 className="beauty-input"
// // //               />
// // //             </div>
// // //             {errors.email && (
// // //               <span className="beauty-error-message">{errors.email}</span>
// // //             )}
// // //           </div>

// // //           <div className={`beauty-form-group ${errors.password ? 'has-error' : ''}`}>
// // //             <div className="beauty-input-container">
// // //               <FiLock className="beauty-input-icon" />
// // //               <input
// // //                 id="password"
// // //                 type={showPassword ? "text" : "password"}
// // //                 name="password"
// // //                 value={formData.password}
// // //                 onChange={handleChange}
// // //                 placeholder="Password (8+ characters)"
// // //                 className="beauty-input"
// // //               />
// // //               <button
// // //                 type="button"
// // //                 className="beauty-password-toggle"
// // //                 onClick={() => setShowPassword(!showPassword)}
// // //                 aria-label={showPassword ? "Hide password" : "Show password"}
// // //               >
// // //                 {showPassword ? <FiEyeOff /> : <FiEye />}
// // //               </button>
// // //             </div>
// // //             {errors.password && (
// // //               <span className="beauty-error-message">{errors.password}</span>
// // //             )}
// // //           </div>

// // //           <div className={`beauty-form-group ${errors.confirmPassword ? 'has-error' : ''}`}>
// // //             <div className="beauty-input-container">
// // //               <FiLock className="beauty-input-icon" />
// // //               <input
// // //                 id="confirmPassword"
// // //                 type={showConfirmPassword ? "text" : "password"}
// // //                 name="confirmPassword"
// // //                 value={formData.confirmPassword}
// // //                 onChange={handleChange}
// // //                 placeholder="Confirm Password"
// // //                 className="beauty-input"
// // //               />
// // //               <button
// // //                 type="button"
// // //                 className="beauty-password-toggle"
// // //                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// // //                 aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
// // //               >
// // //                 {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
// // //               </button>
// // //             </div>
// // //             {errors.confirmPassword && (
// // //               <span className="beauty-error-message">{errors.confirmPassword}</span>
// // //             )}
// // //           </div>

// // //           <div className="beauty-form-actions">
// // //             <button
// // //               type="submit"
// // //               className="beauty-submit-button"
// // //               disabled={isSubmitting}
// // //             >
// // //               {isSubmitting ? (
// // //                 <span className="beauty-spinner"></span>
// // //               ) : (
// // //                 'Sign Up'
// // //               )}
// // //             </button>
// // //             <button
// // //               type="button"
// // //               className="beauty-cancel-button"
// // //               onClick={onClose}
// // //               disabled={isSubmitting}
// // //             >
// // //               Cancel
// // //             </button>
// // //           </div>
// // //         </form>

// // //         <div className="beauty-social-divider">
// // //           <span>or sign up with</span>
// // //         </div>

// // //         <div className="beauty-social-buttons">
// // //           <button
// // //             type="button"
// // //             className="beauty-social-button beauty-google-button"
// // //             onClick={() => onOAuthLogin('google')} // Call OAuth handler with provider
// // //           >
// // //             <FaGoogle className="beauty-social-icon" />
// // //             Google
// // //           </button>
// // //           <button
// // //             type="button"
// // //             className="beauty-social-button beauty-facebook-button"
// // //             onClick={() => onOAuthLogin('facebook')} // Call OAuth handler with provider
// // //           >
// // //             <FaFacebook className="beauty-social-icon" />
// // //             Facebook
// // //           </button>
// // //         </div>

// // //         <div className="beauty-form-footer">
// // //           <p>Already have an account? <button type="button" className="beauty-text-button" onClick={onShowLogin}>Sign in</button></p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // export default BeautyForm;
// import React, { useState, useContext } from 'react';
// import { ThemeContext } from './ThemeContext';
// import { FiUser, FiLock, FiMail, FiCalendar, FiEye, FiEyeOff, FiX,FiHeart } from 'react-icons/fi';
// // import { FcGoogle } from 'react-icons/fc';
// // import { FaFacebook } from 'react-icons/fa';
// import ChatBot from './ChatBot';
// import './BeautyForm.css';

// const BeautyForm = ({ onClose, onShowLogin }) => {
//   const { darkMode } = useContext(ThemeContext);
//   const [formData, setFormData] = useState({
//     name: '',
//     age: '',
//     gender: 'female',
//     secret: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showChatBot, setShowChatBot] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: name === 'age' ? (value === '' ? '' : Number(value)) : value
//     }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = 'Name is required';
//     if (!formData.age) newErrors.age = 'Age is required';
//     else if (formData.age < 13 || formData.age > 120) newErrors.age = 'Age must be between 13-120';
//     if (!formData.email.trim()) newErrors.email = 'Email is required';
//     else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
//     if (!formData.password) newErrors.password = 'Password is required';
//     else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
//     if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

  
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (!validateForm()) return;

//   setIsSubmitting(true);

//   try {
//     const response = await fetch('http://localhost:8000/usersignupregister', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         name: formData.name,
//         age: formData.age,
//         gender: formData.gender,
//         secret:formData.secret,
//         email: formData.email,
//         password: formData.password,
//         confirm_password: formData.confirmPassword
//       }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       setErrors({ form: errorData.message || 'Signup failed' });
//     } else {
//       const result = await response.json();
//       console.log('User registered:', result);
//       // Proceed to ChatBot or any next step
//       setShowChatBot(true);
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     setErrors({ form: 'An error occurred. Please try again.' });
//   } finally {
//     setIsSubmitting(false);
//   }
// };







//   const handleOverlayClick = (e) => {
//     if (e.target === e.currentTarget) onClose();
//   };

//   if (showChatBot) {
//     return (
//       <ChatBot
//         userData={{
//           name: formData.name,
//           age: formData.age,
//           gender: formData.gender,
//         }}
//         onClose={() => {
//           setShowChatBot(false);
//           onClose();
//         }}
//       />
//     );
//   }

//   return (
//     <div className="beauty-modal-overlay" onClick={handleOverlayClick}>
//       <div className={`beauty-login-card ${darkMode ? 'dark' : 'light'}`}>
//         <button className="beauty-close-button" onClick={onClose}>
//           <FiX />
//         </button>
//         <button className='beauty-back-button' onClick={() => onShowLogin && onShowLogin()}>
//         </button>

//         <div className="beauty-login-header">
//           <div className="beauty-logo">
//             <span className="beauty-logo-icon">🌸</span>
//             <h1>AIBeauty</h1>
//           </div>
//           <h2>Create Your Account</h2>

//         </div>

//         {errors.form && (
//           <div className="beauty-form-error">
//             {errors.form}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="beauty-login-form">
//           <div className={`beauty-form-group ${errors.name ? 'has-error' : ''}`}>
//             <div className="beauty-input-container">
//               <FiUser className="beauty-input-icon" />
//               <input
//                 id="name"
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Full Name"
//                 className="beauty-input"
//               />
//             </div>
//             {errors.name && (
//               <span className="beauty-error-message">{errors.name}</span>
//             )}
//           </div>

//           <div className={`beauty-form-group ${errors.age ? 'has-error' : ''}`}>
//             <div className="beauty-input-container">
//               <FiCalendar className="beauty-input-icon" />
//               <input
//                 id="age"
//                 type="number"
//                 name="age"
//                 value={formData.age}
//                 onChange={handleChange}
//                 placeholder="Age (13-120)"
//                 min="13"
//                 max="120"
//                 className="beauty-input"
//               />
//             </div>
//             {errors.age && (
//               <span className="beauty-error-message">{errors.age}</span>
//             )}
//           </div>

//           <div className="beauty-form-group">
//             <div className="beauty-input-container">
//               <FiUser className="beauty-input-icon" />
//               <select
//                 id="gender"
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 className="beauty-input"
//               >
//                 <option value="female">Female</option>
//                 <option value="male">Male</option>
//                 <option value="other">Other</option>
//                 <option value="prefer-not-to-say">Prefer not to say</option>
//               </select>
//             </div>
//           </div>

//           <div className="beauty-form-group">
//             <div className="beauty-input-container">
//               <FiHeart className="beauty-input-icon" />
//               <select
//                 id="secret"
//                 name="secret"
//                 value={formData.secret}
//                 onChange={handleChange}
//                 className="beauty-input"
               
//               >
//                 <option>💄 Answer a secret question?</option>
//                 <option value="Maybelline">Maybelline</option>
//                 <option value="L'Oreal">L'Oreal </option>
//                 <option value="Silky Girl">Silky Girl</option>
//                  <option value="Bella">Bella</option>
                
//                 <option value="Kate Tokyo">Kate Tokyo</option>
//               </select>
//             </div>
//           </div>

//           <div className={`beauty-form-group ${errors.email ? 'has-error' : ''}`}>
//             <div className="beauty-input-container">
//               <FiMail className="beauty-input-icon" />
//               <input
//                 id="email"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email Address"
//                 className="beauty-input"
//               />
//             </div>
//             {errors.email && (
//               <span className="beauty-error-message">{errors.email}</span>
//             )}
//           </div>

//           <div className={`beauty-form-group ${errors.password ? 'has-error' : ''}`}>
//             <div className="beauty-input-container">
//               <FiLock className="beauty-input-icon" />
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password (8+ characters)"
//                 className="beauty-input"
//               />
//               <button
//                 type="button"
//                 className="beauty-password-toggle"
//                 onClick={() => setShowPassword(!showPassword)}
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? <FiEyeOff /> : <FiEye />}
//               </button>
//             </div>
//             {errors.password && (
//               <span className="beauty-error-message">{errors.password}</span>
//             )}
//           </div>

//           <div className={`beauty-form-group ${errors.confirmPassword ? 'has-error' : ''}`}>
//             <div className="beauty-input-container">
//               <FiLock className="beauty-input-icon" />
//               <input
//                 id="confirmPassword"
//                 type={showPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Confirm Password"
//                 className="beauty-input"
//               />
//             </div>
//             {errors.confirmPassword && (
//               <span className="beauty-error-message">{errors.confirmPassword}</span>
//             )}
//           </div>

//           <div className="beauty-form-actions">
//             <button
//               type="submit"
//               className="beauty-submit-button"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <span className="beauty-spinner"></span>
//               ) : (
//                 'Sign up'
//               )}
//             </button>
//             <button
//               type="button"
//               className="beauty-cancel-button"
//               onClick={onClose}
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>

//         {/* <div className="beauty-social-divider">
//           <span>or sign up with</span>
//         </div> */}

//         {/* <div className="beauty-social-buttons">
//           <button
//             type="button"
//             className="beauty-social-button beauty-google-button"
//             onClick={() => console.log('Google sign up')}
//           >
//             <FcGoogle className="beauty-social-icon" />
//             Google
//           </button>
//           <button
//             type="button"
//             className="beauty-social-button beauty-facebook-button"
//             onClick={() => console.log('Facebook sign up')}
//           >
//             <FaFacebook className="beauty-social-icon" />
//             Facebook
//           </button>
//         </div> */}

//         {/* <div className="beauty-form-footer">
//           <p>Already have an account? <button type="button" className="beauty-text-button">Sign in</button></p>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default BeautyForm;


// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ThemeContext } from './ThemeContext';
// import { FiUser, FiLock, FiMail, FiCalendar, FiEye, FiEyeOff, FiX, FiHeart } from 'react-icons/fi';
// import './BeautyForm.css';

// const BeautyForm = ({ onClose, onShowLogin }) => {
//   const { darkMode } = useContext(ThemeContext);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     age: '',
//     gender: 'female',
//     secret: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: name === 'age' ? (value === '' ? '' : Number(value)) : value
//     }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = 'Name is required';
//     if (!formData.age) newErrors.age = 'Age is required';
//     else if (formData.age < 13 || formData.age > 120) newErrors.age = 'Age must be between 13-120';
//     if (!formData.email.trim()) newErrors.email = 'Email is required';
//     else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
//     if (!formData.password) newErrors.password = 'Password is required';
//     else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
//     if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
//     if (!formData.secret.trim()) newErrors.secret = 'Please enter your favorite cosmetic brand';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsSubmitting(true);

//     try {
//       const response = await fetch('http://localhost:8000/usersignupregister', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           age: formData.age,
//           gender: formData.gender,
//           secret: formData.secret,
//           email: formData.email,
//           password: formData.password,
//           confirm_password: formData.confirmPassword
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         const message = errorData.detail || 'Signup failed';
//         setModalMessage(message);
//         setShowModal(true);
//         return;
//       }

//       const result = await response.json();
//       console.log('User registered:', result);
      
//       // Navigate to chat page with user data
//       navigate('/chat', {
//         state: {
//           userData: {
//             name: formData.name,
//             age: formData.age,
//             gender: formData.gender,
//           }
//         }
//       });
//     } catch (error) {
//       console.error('Error:', error);
//       setModalMessage('An error occurred. Please try again.');
//       setShowModal(true);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // const handleOverlayClick = (e) => {
//   //   if (e.target === e.currentTarget) onClose(); onClick={handleOverlayClick}
//   // };



//   return (
//     <div className="beauty-modal-overlay">
//       <div className={`beauty-login-card ${darkMode ? 'dark' : 'light'}`}>
//         <button className="beauty-close-button" onClick={onClose}><FiX /></button>
//         <button className="beauty-back-button" onClick={() => onShowLogin && onShowLogin()}></button>

//         <div className="beauty-login-header">
//           <div className="beauty-logo">
//             <span className="beauty-logo-icon">🌸</span>
//             <h1>AIBeauty</h1>
//           </div>
//           <h2>Create Your Account</h2>
//         </div>

//         <form onSubmit={handleSubmit} className="beauty-login-form">
//           <div className={`beauty-form-group ${errors.name ? 'has-error' : ''}`}>
//             <div className="beauty-input-container">
//               <FiUser className="beauty-input-icon" />
//               <input
//                 id="name"
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Full Name"
//                 className="beauty-input"
//               />
//             </div>
//             {errors.name && <span className="beauty-error-message">{errors.name}</span>}
//           </div>

//           <div className={`beauty-form-group ${errors.age ? 'has-error' : ''}`}>
//             <div className="beauty-input-container">
//               <FiCalendar className="beauty-input-icon" />
//               <input
//                 id="age"
//                 type="number"
//                 name="age"
//                 value={formData.age}
//                 onChange={handleChange}
//                 placeholder="Age (13-120)"
//                 min="13"
//                 max="120"
//                 className="beauty-input"
//               />
//             </div>
//             {errors.age && <span className="beauty-error-message">{errors.age}</span>}
//           </div>

//           <div className="beauty-form-group">
//             <div className="beauty-input-container">
//               <FiUser className="beauty-input-icon" />
//               <select
//                 id="gender"
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 className="beauty-input"
//               >
//                 <option value="female">Female</option>
//                 <option value="male">Male</option>
//                 <option value="other">Other</option>
//                 <option value="prefer-not-to-say">Prefer not to say</option>
//               </select>
//             </div>
//           </div>

//           <div className={`beauty-form-group ${errors.secret ? 'has-error' : ''}`}>
//             <div className="beauty-input-container">
//               <FiHeart className="beauty-input-icon" />
//               <input
//                 id="secret"
//                 type="text"
//                 name="secret"
//                 value={formData.secret}
//                 onChange={handleChange}
//                 placeholder="Please enter favourite cosmetic brand"
//                 className="beauty-input"
//               />
//             </div>
//             {errors.secret && <span className="beauty-error-message">{errors.secret}</span>}
//           </div>

//           <div className={`beauty-form-group ${errors.email ? 'has-error' : ''}`}>
//             <div className="beauty-input-container">
//               <FiMail className="beauty-input-icon" />
//               <input
//                 id="email"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email Address"
//                 className="beauty-input"
//               />
//             </div>
//             {errors.email && <span className="beauty-error-message">{errors.email}</span>}
//           </div>

//           <div className={`beauty-form-group ${errors.password ? 'has-error' : ''}`}>
//             <div className="beauty-input-container">
//               <FiLock className="beauty-input-icon" />
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password (8+ characters)"
//                 className="beauty-input"
//               />
//               <button
//                 type="button"
//                 className="beauty-password-toggle"
//                 onClick={() => setShowPassword(!showPassword)}
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? <FiEye /> : <FiEyeOff/>}
//               </button>
//             </div>
//             {errors.password && <span className="beauty-error-message">{errors.password}</span>}
//           </div>

//           <div className={`beauty-form-group ${errors.confirmPassword ? 'has-error' : ''}`}>
//             <div className="beauty-input-container">
//               <FiLock className="beauty-input-icon" />
//               <input
//                 id="confirmPassword"
//                 type={showPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Confirm Password"
//                 className="beauty-input"
//               />
//             </div>
//             {errors.confirmPassword && <span className="beauty-error-message">{errors.confirmPassword}</span>}
//           </div>

//           <div className="beauty-form-actions">
//             <button
//               type="submit"
//               className="beauty-submit-button"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? <span className="beauty-spinner"></span> : 'Sign up'}
//             </button>
//             <button
//               type="button"
//               className="beauty-cancel-button"
//               onClick={onClose}
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>

//         <div className="beauty-account-link">
//           <p>
//             Already have an account?{' '}
//             <button
//               type="button"
//               className="beauty-link-button"
//               onClick={onShowLogin}
//               disabled={isSubmitting}
//             >
//               Sign in here
//             </button>
//           </p>
//         </div>

//       </div>
//       {showModal && (
//         <div className="beauty-error-modal-overlay">
//           <div className={`beauty-error-modal ${darkMode ? 'dark' : ''}`}>
//             <p>{modalMessage}</p>
//             <button
//               className="beauty-modal-ok-button"
//               onClick={() => setShowModal(false)}
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BeautyForm;

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import { FiUser, FiLock, FiMail, FiCalendar, FiEye, FiEyeOff, FiX, FiHeart } from 'react-icons/fi';
import './BeautyForm.css';

const BeautyForm = ({ onClose, onShowLogin }) => {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'female',
    secret: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
  // NEW: State for the success modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? (value === '' ? '' : Number(value)) : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age) newErrors.age = 'Age is required';
    else if (formData.age < 13 || formData.age > 120) newErrors.age = 'Age must be between 13-120';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.secret.trim()) newErrors.secret = 'Please enter your favorite cosmetic brand';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8000/usersignupregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          age: formData.age,
          gender: formData.gender,
          secret: formData.secret,
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirmPassword
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const message = errorData.detail || 'Signup failed';
        setModalMessage(message);
        setShowModal(true);
        return;
      }

      // If registration is successful, show the success modal
      setShowSuccessModal(true);
      
      // Wait for 2 seconds, then hide the modal and navigate
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate('/chat', {
          state: {
            userData: {
              name: formData.name,
              age: formData.age,
              gender: formData.gender,
            }
          }
        });
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      setModalMessage('An error occurred. Please try again.');
      setShowModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="beauty-modal-overlay">
      <div className={`beauty-login-card ${darkMode ? 'dark' : 'light'}`}>
        <button className="beauty-close-button" onClick={onClose}><FiX /></button>
        <button className="beauty-back-button" onClick={() => onShowLogin && onShowLogin()}></button>

        <div className="beauty-login-header">
          <div className="beauty-logo">
            <span className="beauty-logo-icon">🌸</span>
            <h1>AuraBot</h1>
          </div>
          <h2>Create Your Account</h2>
        </div>

        <form onSubmit={handleSubmit} className="beauty-login-form">
          <div className={`beauty-form-group ${errors.name ? 'has-error' : ''}`}>
            <div className="beauty-input-container">
              <FiUser className="beauty-input-icon" />
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="beauty-input"
              />
            </div>
            {errors.name && <span className="beauty-error-message">{errors.name}</span>}
          </div>

          <div className={`beauty-form-group ${errors.age ? 'has-error' : ''}`}>
            <div className="beauty-input-container">
              <FiCalendar className="beauty-input-icon" />
              <input
                id="age"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age (13-120)"
                min="13"
                max="120"
                className="beauty-input"
              />
            </div>
            {errors.age && <span className="beauty-error-message">{errors.age}</span>}
          </div>

          <div className="beauty-form-group">
            <div className="beauty-input-container">
              <FiUser className="beauty-input-icon" />
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="beauty-input"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className={`beauty-form-group ${errors.secret ? 'has-error' : ''}`}>
            <div className="beauty-input-container">
              <FiHeart className="beauty-input-icon" />
              <input
                id="secret"
                type="text"
                name="secret"
                value={formData.secret}
                onChange={handleChange}
                placeholder="Please enter favourite cosmetic brand"
                className="beauty-input"
              />
            </div>
            {errors.secret && <span className="beauty-error-message">{errors.secret}</span>}
          </div>

          <div className={`beauty-form-group ${errors.email ? 'has-error' : ''}`}>
            <div className="beauty-input-container">
              <FiMail className="beauty-input-icon" />
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="beauty-input"
              />
            </div>
            {errors.email && <span className="beauty-error-message">{errors.email}</span>}
          </div>

          <div className={`beauty-form-group ${errors.password ? 'has-error' : ''}`}>
            <div className="beauty-input-container">
              <FiLock className="beauty-input-icon" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password (8+ characters)"
                className="beauty-input"
              />
              <button
                type="button"
                className="beauty-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEye /> : <FiEyeOff/>}
              </button>
            </div>
            {errors.password && <span className="beauty-error-message">{errors.password}</span>}
          </div>

          <div className={`beauty-form-group ${errors.confirmPassword ? 'has-error' : ''}`}>
            <div className="beauty-input-container">
              <FiLock className="beauty-input-icon" />
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="beauty-input"
              />
            </div>
            {errors.confirmPassword && <span className="beauty-error-message">{errors.confirmPassword}</span>}
          </div>

          <div className="beauty-form-actions">
            <button
              type="submit"
              className="beauty-submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? <span className="beauty-spinner"></span> : 'Sign up'}
            </button>
            <button
              type="button"
              className="beauty-cancel-button"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="beauty-account-link">
          <p>
            Already have an account?{' '}
            <button
              type="button"
              className="beauty-link-button"
              onClick={onShowLogin}
              disabled={isSubmitting}
            >
              Sign in here
            </button>
          </p>
        </div>

      </div>
      {showModal && (
        <div className="beauty-error-modal-overlay">
          <div className={`beauty-error-modal ${darkMode ? 'dark' : ''}`}>
            <p>{modalMessage}</p>
            <button
              className="beauty-modal-ok-button"
              onClick={() => setShowModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
      {/* NEW: The success modal is rendered here when showSuccessModal is true */}
      {showSuccessModal && (
        <div className="beauty-modal-overlay">
          <div className={`beauty-modal beauty-success-modal ${darkMode ? 'dark' : ''}`}>
            <button className="beauty-close-button" onClick={() => setShowSuccessModal(false)}><FiX /></button>
            <div className="beauty-success-content">
              <FiHeart size={50} color="#4CAF50" />
              <h3>Registration Successful!</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeautyForm;
