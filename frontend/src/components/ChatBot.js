// // import React, { useState, useContext, useRef, useEffect } from 'react';
// // import { ThemeContext } from './ThemeContext';
// // import {
// //   FiCamera,
// //   FiImage,
// //   FiSend,
// //   FiMenu,
// //   FiUser,
// //   FiSettings,
// //   FiHelpCircle,
// //   FiX,
// //   FiLogOut
// // } from 'react-icons/fi';
// // import './ChatBot.css';

// // const API_URL = 'http://localhost:8000'; // Define your backend API URL here
// // const SESSION_ID = 'user_session_' + Math.random().toString(36).substr(2, 9);

// // // A simple component to render product recommendations
// // function ProductRecommendationCard({ product }) {
// //   const imageUrl = `${API_URL}${product.image_url}`;
// //   return (
// //     <div className="product-card">
// //       <img src={imageUrl} alt={product.name} className="product-image" />
// //       <div className="product-details">
// //         <h3>{product.name}</h3>
// //         <p><strong>Brand:</strong> {product.brand}</p>
// //         <p><strong>Type:</strong> {product.product_type}</p>
// //         <p><strong>Benefits:</strong> {product.benefits}</p>
// //         <p><strong>Ingredients:</strong> {product.ingredients.join(', ')}</p>
// //         <p><strong>Suggestion:</strong> {product.reasoning}</p>
// //       </div>
// //     </div>
// //   );
// // }

// // const Chatbot = ({ userData, onClose }) => {
// //   const { darkMode, toggleTheme } = useContext(ThemeContext);
// //   const [messages, setMessages] = useState([
// //     {
// //       text: userData
// //         ? `Hi ${userData.name}! I see you're ${userData.age} years old. How can I help with your ${userData.skinType} skin today? 💖`
// //         : "Welcome to AI Beauty! 💅 How can I help you today?",
// //       sender: 'bot'
// //     }
// //   ]);
// //   const [inputMessage, setInputMessage] = useState('');
// //   const [showMediaOptions, setShowMediaOptions] = useState(false);
// //   const [showMenu, setShowMenu] = useState(false);
// //   const [activePanel, setActivePanel] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);

// //   // Webcam state
// //   const [isWebcamActive, setIsWebcamActive] = useState(false);
// //   const videoRef = useRef(null);
// //   const canvasRef = useRef(null);

// //   const fileInputRef = useRef(null);
// //   const messagesEndRef = useRef(null);

// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //   }, [messages]);

// //   const colors = darkMode
// //     ? {
// //         primary: '#2d3748',
// //         secondary: '#4a5568',
// //         accent: '#718096',
// //         background: '#1a202c',
// //         text: '#e2e8f0',
// //         bubbleBot: '#2d3748',
// //         bubbleUser: '#4a5568',
// //         headerText: '#ffffff',
// //         bubbleUserText: '#ffffff',
// //         inputBackground: '#4a5568',
// //         buttonText: '#ec9b65ff'
// //     }
// //     : {
// //         primary: '#fdd7ceff',
// //         secondary: '#f3f0f0ff',
// //         accent: '#f7f1f4ff',
// //         background: '#F9F5F7',
// //         text: '#4A3A5A',
// //         bubbleBot: '#f6f4f8ff',
// //         bubbleUser: '#fafafaff',
// //         headerText: '#FFFFFF',
// //         bubbleUserText: '#FFFFFF',
// //         inputBackground: '#FFFFFF',
// //         buttonText: '#FFFFFF'
// //     };

// //   const handleLogout = () => {
// //     console.log("User logged out");
// //     setShowMenu(false);
// //     if (onClose) onClose();
// //   };

// //   const menuItems = [
// //     {
// //       icon: <FiUser size={18} />,
// //       label: "Profile",
// //       panel: (
// //         <div className="info-panel" style={{ color: colors.text }}>
// //           <h3>Your Profile 💖</h3>
// //           <div className="profile-info">
// //             <p><strong>Name:</strong> {userData?.name || 'Not provided'}</p>
// //             <p><strong>Age:</strong> {userData?.age || 'Not provided'}</p>
// //             <p><strong>Skin Type:</strong> {userData?.skinType || 'Not provided'}</p>
// //           </div>
// //         </div>
// //       )
// //     },
// //     {
// //       icon: <FiSettings size={18} />,
// //       label: "Settings",
// //       panel: (
// //         <div className="info-panel" style={{ color: colors.text }}>
// //           <h3>Chat Settings ⚙️</h3>
// //           <div className="settings-options">
// //             <label>
// //               <input type="checkbox" /> Enable notifications
// //             </label>
// //             <label>
// //               <input
// //                 type="checkbox"
// //                 checked={darkMode}
// //                 onChange={toggleTheme}
// //               /> Dark mode
// //             </label>
// //           </div>
// //         </div>
// //       )
// //     },
// //     {
// //       icon: <FiLogOut size={18} />,
// //       label: "Logout",
// //       action: handleLogout
// //     }
// //   ];

// //   const handleMenuItemClick = (item) => {
// //     if (item.action) {
// //       item.action();
// //       setShowMenu(false);
// //     } else if (item.panel) {
// //       setActivePanel(item.panel);
// //       setShowMenu(false);
// //     }
// //   };

// //   const handleSendMessage = async (e) => {
// //     e.preventDefault();
// //     if (!inputMessage.trim() || isLoading) return;

// //     const userMsg = { text: inputMessage, sender: 'user' };
// //     setMessages(prev => [...prev, userMsg]);
// //     setInputMessage('');
// //     setIsLoading(true);

// //     try {
// //       const response = await fetch(`${API_URL}/chat`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           user_message: inputMessage,
// //           session_id: SESSION_ID,
// //           chat_history: messages.map(msg => ({ [msg.sender]: msg.text }))
// //         }),
// //       });

// //       if (!response.ok) throw new Error('Network response was not ok');

// //       const data = await response.json();
// //       const botMsg = { 
// //         text: data.response, 
// //         sender: 'bot',
// //         recommendations: data.product_recommendation || []
// //       };
// //       setMessages(prev => [...prev, botMsg]);
// //     } catch (error) {
// //       console.error("Error sending message:", error);
// //       setMessages(prev => [...prev, { text: 'Sorry, something went wrong.', sender: 'bot' }]);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // --- Image Upload & Webcam Functionality ---
// //   const handleFileUpload = async (file) => {
// //     if (!file || isLoading) return;
// //     setIsLoading(true);

// //     const reader = new FileReader();
// //     reader.readAsDataURL(file);

// //     reader.onload = async () => {
// //       const base64Image = reader.result.split(',')[1];
// //       const userMsg = { text: `Uploaded image: ${file.name}`, sender: 'user', image: URL.createObjectURL(file) };
// //       setMessages(prev => [...prev, userMsg]);

// //       try {
// //         const response = await fetch(`${API_URL}/upload_image`, {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify({ session_id: SESSION_ID, image_data: base64Image }),
// //         });

// //         if (!response.ok) throw new Error('Image upload failed');

// //         const data = await response.json();
// //         const botMsg = { text: data.response, sender: 'bot' };
// //         setMessages(prev => [...prev, botMsg]);
// //       } catch (error) {
// //         console.error("Error uploading image:", error);
// //         setMessages(prev => [...prev, { text: 'Sorry, the image could not be processed.', sender: 'bot' }]);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };
// //   };
  
// //   const handleGalleryClick = () => {
// //     fileInputRef.current.click();
// //     setShowMediaOptions(false);
// //   };
  
// //   const handleFileChange = (e) => {
// //     handleFileUpload(e.target.files[0]);
// //   };

// //   const startWebcam = async () => {
// //     try {
// //       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
// //       videoRef.current.srcObject = stream;
// //       setIsWebcamActive(true);
// //       setShowMediaOptions(false);
// //     } catch (error) {
// //       console.error('Error accessing webcam:', error);
// //       alert('Could not access your camera.');
// //     }
// //   };

// //   const captureImage = async () => {
// //     if (!isWebcamActive || isLoading) return;
// //     setIsLoading(true);

// //     const video = videoRef.current;
// //     const canvas = canvasRef.current;
// //     canvas.width = video.videoWidth;
// //     canvas.height = video.videoHeight;
// //     const context = canvas.getContext('2d');
// //     context.drawImage(video, 0, 0, canvas.width, canvas.height);
// //     const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];

// //     setMessages(prev => [...prev, { text: 'Captured an image from your camera.', sender: 'user', image: canvas.toDataURL('image/jpeg') }]);

// //     // Stop webcam after capture
// //     if (videoRef.current.srcObject) {
// //       videoRef.current.srcObject.getTracks().forEach(track => track.stop());
// //     }
// //     setIsWebcamActive(false);

// //     try {
// //       const response = await fetch(`${API_URL}/capture_image`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ session_id: SESSION_ID, image_data: base64Image }),
// //       });

// //       if (!response.ok) throw new Error('Photo capture failed');

// //       const data = await response.json();
// //       const botMsg = { text: data.response, sender: 'bot' };
// //       setMessages(prev => [...prev, botMsg]);
// //     } catch (error) {
// //       console.error("Error capturing photo:", error);
// //       setMessages(prev => [...prev, { text: 'Sorry, the photo could not be processed.', sender: 'bot' }]);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };
  
// //   return (
// //     <div className="fullscreen-chatbot" style={{ backgroundColor: colors.background }}>
// //       <div className="chatbot-header" style={{ backgroundColor: colors.primary }}>
// //         <div className="header-left">
// //           <button
// //             className="menu-button"
// //             onClick={() => setShowMenu(!showMenu)}
// //             style={{ color: colors.headerText }}
// //           >
// //             {showMenu ? <FiX size={24} /> : <FiMenu size={24} />}
// //           </button>
// //           <h2 style={{ color: colors.headerText }}>AI Beauty 💄</h2>
// //         </div>
// //       </div>

// //       <div className="chat-content-wrapper">
// //         {showMenu && (
// //           <div
// //             className="menu-dropdown"
// //             style={{ backgroundColor: colors.secondary }}
// //           >
// //             <ul className="menu-items">
// //               {menuItems.map((item, index) => (
// //                 <li
// //                   key={index}
// //                   onClick={() => handleMenuItemClick(item)}
// //                   style={{ color: colors.text }}
// //                 >
// //                   {item.icon}
// //                   <span>{item.label}</span>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         )}

// //         {activePanel && (
// //           <div
// //             className="info-panel-container"
// //             style={{ backgroundColor: colors.accent }}
// //           >
// //             <button
// //               className="close-panel-button"
// //               onClick={() => setActivePanel(null)}
// //               style={{ color: colors.text }}
// //             >
// //               <FiX size={20} />
// //             </button>
// //             {activePanel}
// //           </div>
// //         )}

// //         <div className="chat-content">
// //           <div className="chatbot-messages">
// //             {messages.map((msg, i) => (
// //               <div
// //                 key={i}
// //                 className={`message ${msg.sender}`}
// //                 style={{
// //                   backgroundColor: msg.sender === 'bot' ? colors.bubbleBot : colors.bubbleUser,
// //                   color: msg.sender === 'bot' ? colors.text : colors.bubbleUserText
// //                 }}
// //               >
// //                 <div className="message-bubble">
// //                   {msg.text && <div className="message-text">{msg.text}</div>}
// //                   {msg.image && (
// //                     <div className="message-image-container">
// //                       <img src={msg.image} alt="User-uploaded content" />
// //                     </div>
// //                   )}
// //                   {msg.recommendations && msg.recommendations.length > 0 && (
// //                     <div className="product-recommendations">
// //                       {msg.recommendations.map((rec, recIndex) => (
// //                         <ProductRecommendationCard key={recIndex} product={rec} />
// //                       ))}
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             ))}
// //             {isLoading && <div className="message bot loading"><span></span><span></span><span></span></div>}
// //             <div ref={messagesEndRef} />
// //           </div>

// //           {isWebcamActive && (
// //             <div className="webcam-view">
// //               <video ref={videoRef} autoPlay playsInline />
// //               <canvas ref={canvasRef} style={{ display: 'none' }} />
// //               <div className="webcam-controls">
// //                 <button onClick={captureImage} disabled={isLoading}>Capture</button>
// //                 <button onClick={() => {
// //                   if(videoRef.current.srcObject) videoRef.current.srcObject.getTracks().forEach(track => track.stop());
// //                   setIsWebcamActive(false);
// //                 }}>Cancel</button>
// //               </div>
// //             </div>
// //           )}

// //           <form onSubmit={handleSendMessage} className="chatbot-input-area" style={{ backgroundColor: colors.accent }}>
// //             <button
// //               type="button"
// //               className="media-toggle-button"
// //               onClick={() => setShowMediaOptions(!showMediaOptions)}
// //               style={{ color: colors.primary }}
// //               disabled={isLoading || isWebcamActive}
// //             >
// //               +
// //             </button>
// //             <input
// //               value={inputMessage}
// //               onChange={(e) => setInputMessage(e.target.value)}
// //               placeholder="Type your message..."
// //               style={{
// //                 backgroundColor: colors.inputBackground,
// //                 color: colors.text
// //               }}
// //               disabled={isLoading || isWebcamActive}
// //             />
// //             <button
// //               type="submit"
// //               style={{
// //                 backgroundColor: colors.primary,
// //                 color: colors.buttonText
// //               }}
// //               disabled={isLoading || isWebcamActive}
// //             >
// //               <FiSend />
// //             </button>
// //           </form>
// //         </div>
// //       </div>

// //       {showMediaOptions && (
// //         <div
// //           className="media-options"
// //           style={{ backgroundColor: colors.secondary }}
// //         >
// //           <button onClick={startWebcam} style={{ color: colors.text }}>
// //             <FiCamera />
// //             <span>Camera</span>
// //           </button>
// //           <button onClick={handleGalleryClick} style={{ color: colors.text }}>
// //             <FiImage />
// //             <span>Gallery</span>
// //           </button>
// //           <input
// //             type="file"
// //             ref={fileInputRef}
// //             onChange={handleFileChange}
// //             style={{ display: 'none' }}
// //             accept="image/*"
// //           />
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Chatbot;

// import React, { useState, useContext, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ThemeContext } from './ThemeContext';
// import {
//   FiCamera,
//   FiImage,
//   FiSend,
//   FiMenu,
//   FiUser,
//   FiSettings,
//   FiX,
//   FiLogOut,
//   FiLogIn,  FiShoppingBag // eslint-disable-line no-unused-vars
// } from 'react-icons/fi';
// import './ChatBot.css';

// const API_URL = 'http://localhost:8000'; // Define your backend API URL here
// const SESSION_ID = 'user_session_' + Math.random().toString(36).substr(2, 9);

// // A simple component to render product recommendations
// function ProductRecommendationCard({ product }) {
//   const imageUrl = `${API_URL}${product.image_url}`;
//   return (
//     <div className="product-cards">
//       <div><img src={imageUrl} alt={product.name} className="product-images" /></div>
//       <div className="product-details">
//         <h3>{product.name}</h3>
//         <p><strong>Brand:</strong> {product.brand}</p>
//         <p><strong>Type:</strong> {product.product_type}</p>
//         <p><strong>Benefits:</strong> {product.benefits}</p>
//         <p><strong>Ingredients:</strong> {product.ingredients.join(', ')}</p>
//         <p><strong>Suggestion:</strong> {product.reasoning}</p>
//       </div>
//     </div>
//   );
// }

// const Chatbot = ({ userData, onClose }) => {
//   const { darkMode, toggleTheme } = useContext(ThemeContext);
//   const navigate = useNavigate();
//   const [messages, setMessages] = useState([
//     {
//       text: userData
//         ? `Hi ${userData.name}! I see you're ${userData.age} years old.💖`
//         : "Welcome to AI Beauty! 💅 How can I help you today?",
//       sender: 'bot'
//     }
//   ]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [showMediaOptions, setShowMediaOptions] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);
//   const [activePanel, setActivePanel] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const [isWebcamActive, setIsWebcamActive] = useState(false);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const streamRef = useRef(null);

//   // const fileInputRef = useRef(null);
//   const messagesEndRef = useRef(null);

 

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   useEffect(() => {
//     const getWebcamStream = async () => {
//       if (isWebcamActive) {
//         try {
//           const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//           streamRef.current = stream;
//           if (videoRef.current) {
//             videoRef.current.srcObject = stream;
//           }
//         } catch (error) {
//           console.error('Error accessing webcam:', error);
//           alert('Could not access your camera. Please check your permissions.');
//           setIsWebcamActive(false);
//         }
//       } else {
//         if (streamRef.current) {
//           streamRef.current.getTracks().forEach(track => track.stop());
//           streamRef.current = null;
//         }
//       }
//     };
//     getWebcamStream();

//     return () => {
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, [isWebcamActive]);

//   const colors = darkMode
//     ? {
//         primary: '#2d3748',
//         secondary: '#4a5568',
//         accent: '#4a5568',
//         background: '#1a202c',
//         text: '#0e0f0fff',
//         bubbleBot: 'transparent',
//         // bubbleUser: '#4a5568',
//         headerText: '#ffffff',
//         bubbleUserText: '#ffffff',
//         inputBackground: '#c7d1e1ff',
//         buttonText: '#ec9b65ff'
//     }
//     : {
//         primary: '#FF4799',
//         secondary: '#f1cfdeff',
//         accent: '#d4b6c3ff',
//         background: '#fac6e0ff',
//         text: '#4A3A5A',
//         // bubbleBot: '#f6f4f8ff',
//         // bubbleUser: '#030000ff',
//         headerText: '#FFFFFF',
//         bubbleUserText: '#FFFFFF',
//         inputBackground: '#FFFFFF',
//         buttonText: '#FFFFFF'
//     };


//   const handleLeaveChat = () => {
//       navigate('/'); // Navigate to the homepage
//   };

//   const handleLogout = () => {
//     console.log("User logged out");
//     setShowMenu(false);
//     if (onClose) onClose();
//   };

//   const handleNavigateToProducts = () => {
//     console.log("Navigating to products page");
//     setShowMenu(false);
//     navigate('/products');
//   };

//   const menuItems = [
//     {
//       icon: <FiUser size={18} />,
//       label: "Profile",
//       panel: (
//         <div className="info-panel" style={{ color: colors.text }}>
//           <h3>Your Profile 💖</h3>
//           <div className="profile-info">
//             <p><strong>Name:</strong> {userData?.name || 'Not provided'}</p>
//             <p><strong>Age:</strong> {userData?.age || 'Not provided'}</p>
           
//           </div>
//         </div>
//       )
//     },
//     {
//       icon: <FiShoppingBag size={18} />,
//       label: "Products",
//       action: handleNavigateToProducts
//     },
//     {
//       icon: <FiSettings size={18} />,
//       label: "Settings",
//       panel: (
//         <div className="info-panel" style={{ color: colors.text }}>
//           <h3>Chat Settings ⚙️</h3>
//           <div className="settings-options">
//             <label>
//               <input type="checkbox" /> Enable notifications
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={darkMode}
//                 onChange={toggleTheme}
//               /> Dark mode
//             </label>
//           </div>
//         </div>
//       )
//     },

//     {
//       icon: <FiLogIn size={18} />, // The new item
//       label: "Leave Chat",
//       action: handleLeaveChat 
//     },
//     {
//       icon: <FiLogOut size={18} />,
//       label: "Logout",
//       action: handleLogout
//     }
//   ];

//   const handleMenuItemClick = (item) => {
//     if (item.action) {
//       item.action();
//       setShowMenu(false);
//     } else if (item.panel) {
//       setActivePanel(item.panel);
//     }
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!inputMessage.trim() || isLoading) return;

//     const userMsg = { text: inputMessage, sender: 'user' };
//     setMessages(prev => [...prev, userMsg]);
//     setInputMessage('');
//     setIsLoading(true);

//     try {
//       const response = await fetch(`${API_URL}/chat`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'session_id': SESSION_ID
//         },
//         body: JSON.stringify({
//           user_message: inputMessage,
//           session_id: SESSION_ID,
//           chat_history: messages.map(msg => ({ [msg.sender]: msg.text }))
//         }),
//       });

//       if (!response.ok) throw new Error('Network response was not ok');

//       const data = await response.json();
//       const botMsg = {
//         text: data.response,
//         sender: 'bot',
//         recommendations: data.product_recommendation || []
//       };
//       setMessages(prev => [...prev, botMsg]);
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setMessages(prev => [...prev, { text: 'Sorry, something went wrong.', sender: 'bot' }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // --- CORRECTED FUNCTION: Uses FormData for file upload ---
// // In ChatBot.js, find the handleFileUpload function and modify it as below:

// const handleFileUpload = async (file) => {
   
//     if (!file || isLoading) return;
//     setIsLoading(true);

//     const userMsg = { text: `Uploading image: ${file.name}`, sender: 'user', image: URL.createObjectURL(file) };
//     setMessages(prev => [...prev, userMsg]);

//     try {
//       const formData = new FormData();
//       formData.append('file', file);
      
//     const response = await fetch(`${API_URL}/upload_image?session_id=${SESSION_ID}`, {
//     method: 'POST',
//     body: formData,
// });

//     if (!response.ok) throw new Error('Image upload failed');

//     const data = await response.json();
//     const botMsg = { text: data.response, sender: 'bot' };
//     setMessages(prev => [...prev, botMsg]);
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     setMessages(prev => [...prev, { text: 'Sorry, the image could not be processed.', sender: 'bot' }]);
//   } finally {
//     setIsLoading(false);
//   }
// };
// // In frontend/ChatBot.js, find the handleFileUpload function and modify the fetch call:

// // const handleFileUpload = async (file) => {
// //     if (!file || isLoading) return;
// //     setIsLoading(true);

// //     const userMsg = { text: `Uploading image: ${file.name}`, sender: 'user', image: URL.createObjectURL(file) };
// //     setMessages(prev => [...prev, userMsg]);

// //     try {
// //       const formData = new FormData();
// //       formData.append('file', file);
      
// //       const response = await fetch(`${API_URL}/upload_image?session_id=${SESSION_ID}`, { // CORRECTED LINE
// //         method: 'POST',
// //         // Headers are no longer needed for session_id
// //         body: formData,
// //       });
//       // ... (rest of the function remains unchanged)




//   // const handleGalleryClick = () => {
//   //   setShowMediaOptions(false);
//   // };

//   // In ChatBot.js, find the handleFileChange function:

// const handleFileChange = (e) => {
  
//   console.log("handleFileChange triggered with event:", e); // NEW: Check if the event fires
//   const file = e.target.files[0];
//   if (file) {
//     console.log("File detected:", file.name); // NEW: Check if a file was selected
//   } else {
//     console.log("No file was selected."); // NEW: Log if no file was selected
//   }
//   handleFileUpload(file);
// };

//   const startWebcam = () => {
//     setIsWebcamActive(true);
//     setShowMediaOptions(false);
//   };

//   // This function is already correct, as it sends a JSON body for the capture_image endpoint.
//   const captureImage = async () => {
//     if (!isWebcamActive || isLoading) return;
//     setIsLoading(true);

//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     const context = canvas.getContext('2d');
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];

//     setMessages(prev => [...prev, { text: 'Captured an image from your camera.', sender: 'user', image: canvas.toDataURL('image/jpeg') }]);

//     setIsWebcamActive(false);

//     try {
//       const response = await fetch(`${API_URL}/capture_image`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'session_id': SESSION_ID
//         },
//         body: JSON.stringify({ session_id: SESSION_ID, image_data: base64Image }),
//       });

//       if (!response.ok) throw new Error('Photo capture failed');

//       const data = await response.json();
//       const botMsg = { text: data.response, sender: 'bot' };
//       setMessages(prev => [...prev, botMsg]);
//     } catch (error) {
//       console.error("Error capturing photo:", error);
//       setMessages(prev => [...prev, { text: 'Sorry, the photo could not be processed.', sender: 'bot' }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="fullscreen-chatbot" style={{ backgroundColor: colors.background }}>
//       <div className="chatbot-header" style={{ backgroundColor: colors.primary }}>
//         <div className="header-left">
//           <button
//             className="menu-button"
//             onClick={() => setShowMenu(!showMenu)}
//             style={{ color: colors.headerText }}
//           >
//             {showMenu ? <FiX size={24} /> : <FiMenu size={24} />}
//           </button>
//           <h2 style={{ color: colors.headerText, cursor: 'pointer' }} onClick={() => navigate('/')}>AI Beauty 💄</h2>
//         </div>
//       </div>

//       <div className="chat-content-wrapper">
//         {showMenu && (
//           <div
//             className="menu-dropdown"
//             style={{ backgroundColor: colors.secondary }}
//           >
//             <ul className="menu-items">
//               {menuItems.map((item, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleMenuItemClick(item)}
//                   style={{ color: colors.text }}
//                 >
//                   {item.icon}
//                   <span>{item.label}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {activePanel && (
//           <div
//             className="info-panel-container"
//             style={{ backgroundColor: colors.accent }}
//           >
//             <button
//               className="close-panel-button"
//               onClick={() => setActivePanel(null)}
//               style={{ color: colors.text }}
//             >
//               <FiX size={20} />
//             </button>
//             {activePanel}
//           </div>
//         )}

//         <div className="chat-content">
//           <div className="chatbot-messages">
//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`message ${msg.sender}`}
//                 style={{
//                   backgroundColor: msg.sender === 'bot' ? colors.bubbleBot : colors.bubbleUser,
//                   color: msg.sender === 'bot' ? colors.text : colors.bubbleUserText
//                 }}
//               >
//                 <div className="message-bubble">
//                   {msg.text && <div className="message-text">{msg.text}</div>}
//                   {msg.image && (
//                     <div className="message-image-container">
//                       <img src={msg.image} alt="User-uploaded content" />
//                     </div>
//                   )}
//                   {msg.recommendations && msg.recommendations.length > 0 && (
//                     <div className="product-recommendations">
//                       {msg.recommendations.map((rec, recIndex) => (
//                         <ProductRecommendationCard key={recIndex} product={rec} />
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//             {isLoading && <div className="message bot loading"><span></span><span></span><span></span></div>}
//             <div ref={messagesEndRef} />
//           </div>

//           {isWebcamActive && (
//             <div className="webcam-view">
//               <video ref={videoRef} autoPlay playsInline />
//               <canvas ref={canvasRef} style={{ display: 'none' }} />
//               <div className="webcam-controls">
//                 <button onClick={captureImage} disabled={isLoading}>Capture</button>
//                 <button onClick={() => setIsWebcamActive(false)}>Cancel</button>
//               </div>
//             </div>
//           )}

//           <form onSubmit={handleSendMessage} className="chatbot-input-area" style={{ backgroundColor: colors.accent }}>
//             <button
//               type="button"
//               className="media-toggle-button"
//               onClick={() => setShowMediaOptions(!showMediaOptions)}
//               style={{ color: colors.primary }}
//               disabled={isLoading || isWebcamActive }
//             >
//               +
//             </button>
//             <input
//               value={inputMessage}
//               onChange={(e) => setInputMessage(e.target.value)}
//               placeholder="Type your message..."
//               style={{
//                 backgroundColor: colors.inputBackground,
//                 color: colors.text
//               }}
//               disabled={isLoading || isWebcamActive}
//             />
//             <button
//               type="submit"
//               style={{
//                 backgroundColor: colors.primary,
//                 color: colors.buttonText
//               }}
//               disabled={isLoading || isWebcamActive}
//             >
//               <FiSend />
//             </button>
//           </form>
//         </div>
//       </div>

      
// {showMediaOptions && (
//   <div
//     className="media-options"
//     style={{ backgroundColor: colors.secondary }}
//   >
//     <button onClick={startWebcam} style={{ color: colors.text }}>
//       <FiCamera />
//       <span>Camera</span>
//     </button>
    
//     {/* NEW: This button now contains the hidden file input directly. 
//         Clicking the button will trigger the input. */}
//     <label htmlFor="file-upload" className="gallery-label" style={{ color: colors.text }}>
//     <FiImage />
//       <span>Gallery</span>
//       <input
//         id="file-upload"
//         type="file"
//         onChange={handleFileChange}
//         style={{ display: 'none' }}
//         accept="image/jpeg, image/png"
//       />
//     </label>
//   </div>
// )}
//     </div>
//   );
// };

// export default Chatbot;

import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import {
    FiCamera,
    FiImage,
    FiSend,
    FiMenu,
    FiUser,
    FiSettings,
    FiX,
    FiLogOut,
    FiLogIn,  FiShoppingBag // eslint-disable-line no-unused-vars
} from 'react-icons/fi';
import { getUserData } from '../utils/cookies';
import { FaHistory } from 'react-icons/fa';
import { getSessionMessages, createChatSession } from '../api';
import ChatHistory from './ChatHistory';
import './ChatBot.css';

const API_URL = 'http://localhost:8000'; // Define your backend API URL here
const SESSION_ID = 'user_session_' + Math.random().toString(36).substr(2, 9);

// A simple component to render product recommendations
function ProductRecommendationCard({ product }) {
    const imageUrl = `${API_URL}${product.image_url}`;
    return (
        <div className="product-cards">
            <div><img src={imageUrl} alt={product.name} className="product-images" /></div>
            <div className="product-details">
                <h3>{product.name}</h3>
                <p><strong>Brand:</strong> {product.brand}</p>
                <p><strong>Type:</strong> {product.product_type}</p>
                <p><strong>Benefits:</strong> {product.benefits}</p>
                <p><strong>Ingredients:</strong> {product.ingredients.join(', ')}</p>
                <p><strong>Suggestion:</strong> {product.reasoning}</p>
            </div>
        </div>
    );
}

const Chatbot = ({ userData, onClose }) => {
    const { darkMode, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        {
            text: userData
                ? `Hi ${userData.name}! I see you're ${userData.age} years old.💖`
                : "Welcome to AI Beauty! 💅 How can I help you today?",
            sender: 'bot'
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [showMediaOptions, setShowMediaOptions] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [activePanel, setActivePanel] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    // 💖 ADDED STATES FOR PROGRESSIVE LOADING 💖
    const [isDelayed, setIsDelayed] = useState(false);
    const [isVeryDelayed, setIsVeryDelayed] = useState(false);
    
    const [isWebcamActive, setIsWebcamActive] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    
    // 💖 ADDED REFS FOR TIMERS TO BE ABLE TO CLEAR THEM 💖
    const delayTimerRef = useRef(null);
    const veryDelayedTimerRef = useRef(null);

    // Chat history states
    const [showChatHistory, setShowChatHistory] = useState(false);
    const [currentSessionId, setCurrentSessionId] = useState(SESSION_ID);

    // const fileInputRef = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]); // Added isLoading to dependency array

    useEffect(() => {
        const getWebcamStream = async () => {
            if (isWebcamActive) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    streamRef.current = stream;
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                } catch (error) {
                    console.error('Error accessing webcam:', error);
                    alert('Could not access your camera. Please check your permissions.');
                    setIsWebcamActive(false);
                }
            } else {
                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => track.stop());
                    streamRef.current = null;
                }
            }
        };
        getWebcamStream();

        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, [isWebcamActive]);

    const colors = darkMode
        ? {
            primary: '#2d3748',
            secondary: '#4a5568',
            accent: '#4a5568',
            background: '#1a202c',
            text: '#0e0f0fff',
            bubbleBot: 'transparent',
            // bubbleUser: '#4a5568',
            headerText: '#ffffff',
            bubbleUserText: '#ffffff',
            inputBackground: '#c7d1e1ff',
            buttonText: '#ec9b65ff'
        }
        : {
            primary: '#FF4799',
            secondary: '#f1cfdeff',
            accent: '#d4b6c3ff',
            background: '#fac6e0ff',
            text: '#4A3A5A',
            // bubbleBot: '#f6f4f8ff',
            // bubbleUser: '#030000ff',
            headerText: '#FFFFFF',
            bubbleUserText: '#FFFFFF',
            inputBackground: '#FFFFFF',
            buttonText: '#FFFFFF'
        };


    const handleLeaveChat = () => {
        navigate('/'); // Navigate to the homepage
    };

    const handleLogout = () => {
        console.log("User logged out");
        setShowMenu(false);
        if (onClose) onClose();
    };

    const handleNavigateToProducts = () => {
        console.log("Navigating to products page");
        setShowMenu(false);
        navigate('/products');
    };

    const handleShowChatHistory = () => {
        setShowChatHistory(true);
        setShowMenu(false);
    };

    const handleCreateNewChat = async () => {
        try {
            const userDataFromCookies = getUserData();
            if (userDataFromCookies && userDataFromCookies.email) {
                const response = await createChatSession(userDataFromCookies.email, "New Chat");
                setCurrentSessionId(response.session_id);
                setMessages([
                    {
                        text: userData
                            ? `Hi ${userData.name}!`
                            : "Welcome to AuraBot! 💅 How can I help you today?",
                        sender: 'bot'
                    }
                ]);
                setShowChatHistory(false);
            }
        } catch (error) {
            console.error('Error creating new chat:', error);
        }
    };

    const handleSelectSession = async (session) => {
        try {
            const response = await getSessionMessages(session.session_id);
            const sessionMessages = response.messages || [];
            
            // Convert database messages to chat format
            const formattedMessages = sessionMessages.map(msg => ({
                text: msg.content,
                sender: msg.sender,
                recommendations: msg.metadata?.product_recommendations || null
            }));
            
            setCurrentSessionId(session.session_id);
            setMessages(formattedMessages);
            setShowChatHistory(false);
        } catch (error) {
            console.error('Error loading session messages:', error);
        }
    };

    const menuItems = [
        {
            icon: <FiUser size={18} />,
            label: "Profile",
            panel: (
                <div className="info-panel" style={{ color: colors.text }}>
                    <h3>Your Profile 💖</h3>
                    <div className="profile-info">
                        <p><strong>Name:</strong> {userData?.name || 'Not provided'}</p>
                        <p><strong>Age:</strong> {userData?.age || 'Not provided'}</p>

                    </div>
                </div>
            )
        },
        {
            icon: <FiShoppingBag size={18} />,
            label: "Products",
            action: handleNavigateToProducts
        },
        {
            icon: <FaHistory size={18} />,
            label: "Chat History",
            action: handleShowChatHistory
        },
        {
            icon: <FiSettings size={18} />,
            label: "Settings",
            panel: (
                <div className="info-panel" style={{ color: colors.text }}>
                    <h3>Chat Settings ⚙️</h3>
                    <div className="settings-options">
                        <label>
                            <input type="checkbox" /> Enable notifications
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={darkMode}
                                onChange={toggleTheme}
                            /> Dark mode
                        </label>
                    </div>
                </div>
            )
        },
        {
            icon: <FiLogIn size={18} />,
            label: "Leave Chat",
            action: handleLeaveChat
        },
        {
            icon: <FiLogOut size={18} />,
            label: "Logout",
            action: handleLogout
        }
    ];

    const handleMenuItemClick = (item) => {
        if (item.action) {
            item.action();
            setShowMenu(false);
        } else if (item.panel) {
            setActivePanel(item.panel);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim() || isLoading) return;

        const userMsg = { text: inputMessage, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInputMessage('');
        
        // 💖 MODIFIED: Start the loading and the timers here 💖
        setIsLoading(true);
        delayTimerRef.current = setTimeout(() => setIsDelayed(true), 30000); // 30 seconds
        veryDelayedTimerRef.current = setTimeout(() => setIsVeryDelayed(true), 60000); // 1 minute

        try {
            // Get user data from cookies
            const userDataFromCookies = getUserData();
            
            const response = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'session_id': currentSessionId
                },
                body: JSON.stringify({
                    user_message: inputMessage,
                    session_id: currentSessionId,
                    chat_history: messages.map(msg => ({ [msg.sender]: msg.text })),
                    user_data: userDataFromCookies
                }),
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            const botMsg = {
                text: data.response,
                sender: 'bot',
                recommendations: data.product_recommendation || []
            };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => [...prev, { text: 'Sorry, something went wrong.', sender: 'bot' }]);
        } finally {
            // 💖 MODIFIED: Clear states and timers in the finally block 💖
            setIsLoading(false);
            setIsDelayed(false);
            setIsVeryDelayed(false);
            clearTimeout(delayTimerRef.current);
            clearTimeout(veryDelayedTimerRef.current);
        }
    };

    // --- CORRECTED FUNCTION: Uses FormData for file upload ---
    // In ChatBot.js, find the handleFileUpload function and modify it as below:

    const handleFileUpload = async (file) => {

        if (!file || isLoading) return;
        
        // 💖 MODIFIED: Start the loading and the timers here 💖
        setIsLoading(true);
        delayTimerRef.current = setTimeout(() => setIsDelayed(true), 30000);
        veryDelayedTimerRef.current = setTimeout(() => setIsVeryDelayed(true), 60000);

        const userMsg = { text: `Uploading image: ${file.name}`, sender: 'user', image: URL.createObjectURL(file) };
        setMessages(prev => [...prev, userMsg]);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${API_URL}/upload_image?session_id=${SESSION_ID}`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Image upload failed');

            const data = await response.json();
            const botMsg = { text: data.response, sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error("Error uploading image:", error);
            setMessages(prev => [...prev, { text: 'Sorry, the image could not be processed.', sender: 'bot' }]);
        } finally {
            // 💖 MODIFIED: Clear states and timers in the finally block 💖
            setIsLoading(false);
            setIsDelayed(false);
            setIsVeryDelayed(false);
            clearTimeout(delayTimerRef.current);
            clearTimeout(veryDelayedTimerRef.current);
        }
    };
    // In frontend/ChatBot.js, find the handleFileUpload function and modify the fetch call:

    // const handleFileUpload = async (file) => {
    //     if (!file || isLoading) return;
    //     setIsLoading(true);

    //     const userMsg = { text: `Uploading image: ${file.name}`, sender: 'user', image: URL.createObjectURL(file) };
    //     setMessages(prev => [...prev, userMsg]);

    //     try {
    //       const formData = new FormData();
    //       formData.append('file', file);

    //       const response = await fetch(`${API_URL}/upload_image?session_id=${SESSION_ID}`, { // CORRECTED LINE
    //         method: 'POST',
    //         // Headers are no longer needed for session_id
    //         body: formData,
    //       });
    //       // ... (rest of the function remains unchanged)




    // const handleGalleryClick = () => {
    //   setShowMediaOptions(false);
    // };

    // In ChatBot.js, find the handleFileChange function:

    const handleFileChange = (e) => {

        console.log("handleFileChange triggered with event:", e); // NEW: Check if the event fires
        const file = e.target.files[0];
        if (file) {
            console.log("File detected:", file.name); // NEW: Check if a file was selected
        } else {
            console.log("No file was selected."); // NEW: Log if no file was selected
        }
        handleFileUpload(file);
    };

    const startWebcam = () => {
        setIsWebcamActive(true);
        setShowMediaOptions(false);
    };

    // This function is already correct, as it sends a JSON body for the capture_image endpoint.
    const captureImage = async () => {
        if (!isWebcamActive || isLoading) return;
        
        // 💖 MODIFIED: Start the loading and the timers here 💖
        setIsLoading(true);
        delayTimerRef.current = setTimeout(() => setIsDelayed(true), 30000);
        veryDelayedTimerRef.current = setTimeout(() => setIsVeryDelayed(true), 60000);

        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];

        setMessages(prev => [...prev, { text: 'Captured an image from your camera.', sender: 'user', image: canvas.toDataURL('image/jpeg') }]);

        setIsWebcamActive(false);

        try {
            const response = await fetch(`${API_URL}/capture_image`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'session_id': SESSION_ID
                },
                body: JSON.stringify({ session_id: SESSION_ID, image_data: base64Image }),
            });

            if (!response.ok) throw new Error('Photo capture failed');

            const data = await response.json();
            const botMsg = { text: data.response, sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error("Error capturing photo:", error);
            setMessages(prev => [...prev, { text: 'Sorry, the photo could not be processed.', sender: 'bot' }]);
        } finally {
            // 💖 MODIFIED: Clear states and timers in the finally block 💖
            setIsLoading(false);
            setIsDelayed(false);
            setIsVeryDelayed(false);
            clearTimeout(delayTimerRef.current);
            clearTimeout(veryDelayedTimerRef.current);
        }
    };

    return (
        <div className="fullscreen-chatbot" style={{ backgroundColor: colors.background }}>
            <div className="chatbot-header" style={{ backgroundColor: colors.primary }}>
                <div className="header-left">
                    <button
                        className="menu-button"
                        onClick={() => setShowMenu(!showMenu)}
                        style={{ color: colors.headerText }}
                    >
                        {showMenu ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                    <h2 style={{ color: colors.headerText, cursor: 'pointer' }} onClick={() => navigate('/')}>AuraBot</h2>
                </div>
            </div>

            <div className="chat-content-wrapper">
                {showMenu && (
                    <div
                        className="menu-dropdown"
                        style={{ backgroundColor: colors.secondary }}
                    >
                        <ul className="menu-items">
                            {menuItems.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleMenuItemClick(item)}
                                    style={{ color: colors.text }}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {activePanel && (
                    <div
                        className="info-panel-container"
                        style={{ backgroundColor: colors.accent }}
                    >
                        <button
                            className="close-panel-button"
                            onClick={() => setActivePanel(null)}
                            style={{ color: colors.text }}
                        >
                            <FiX size={20} />
                        </button>
                        {activePanel}
                    </div>
                )}

                <div className="chat-content">
                    <div className="chatbot-messages">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`message ${msg.sender}`}
                                style={{
                                    backgroundColor: msg.sender === 'bot' ? colors.bubbleBot : colors.bubbleUser,
                                    color: msg.sender === 'bot' ? colors.text : colors.bubbleUserText
                                }}
                            >
                                <div className="message-bubble">
                                    {msg.text && <div className="message-text">{msg.text}</div>}
                                    {msg.image && (
                                        <div className="message-image-container">
                                            <img src={msg.image} alt="User-uploaded content" />
                                        </div>
                                    )}
                                    {msg.recommendations && msg.recommendations.length > 0 && (
                                        <div className="product-recommendations">
                                            {msg.recommendations.map((rec, recIndex) => (
                                                <ProductRecommendationCard key={recIndex} product={rec} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {/* 💖 MODIFIED: The loading message based on state 💖 */}
                        {isLoading && (
                        <div className="message bot loading">
                            <div className="message-bubble">
                                {isVeryDelayed ? (
                                    <span className="blinking-text">Be patient before You get a response...</span>
                                ) : isDelayed ? (
                                    <span className="blinking-text">Please wait...</span>
                                ) : (
                                    <span className="blinking-text"><span></span><span></span><span></span></span>
                                )}
                            </div>
                        </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {isWebcamActive && (
                        <div className="webcam-view">
                            <video ref={videoRef} autoPlay playsInline />
                            <canvas ref={canvasRef} style={{ display: 'none' }} />
                            <div className="webcam-controls">
                                <button onClick={captureImage} disabled={isLoading}>Capture</button>
                                <button onClick={() => setIsWebcamActive(false)}>Cancel</button>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSendMessage} className="chatbot-input-area" style={{ backgroundColor: colors.accent }}>
                        <button
                            type="button"
                            className="media-toggle-button"
                            onClick={() => setShowMediaOptions(!showMediaOptions)}
                            style={{ color: colors.primary }}
                            disabled={isLoading || isWebcamActive}
                        >
                            +
                        </button>
                        <input
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Type your message..."
                            style={{
                                backgroundColor: colors.inputBackground,
                                color: colors.text
                            }}
                            disabled={isLoading || isWebcamActive}
                        />
                        <button
                            type="submit"
                            style={{
                                backgroundColor: colors.primary,
                                color: colors.buttonText
                            }}
                            disabled={isLoading || isWebcamActive}
                        >
                            <FiSend />
                        </button>
                    </form>
                </div>
            </div>

            {showMediaOptions && (
                <div
                    className="media-options"
                    style={{ backgroundColor: colors.secondary }}
                >
                    <button onClick={startWebcam} style={{ color: colors.text }}>
                        <FiCamera />
                        <span>Camera</span>
                    </button>

                    {/* NEW: This button now contains the hidden file input directly.
                            Clicking the button will trigger the input. */}
                    <label htmlFor="file-upload" className="gallery-label" style={{ color: colors.text }}>
                        <FiImage />
                        <span>Gallery</span>
                        <input
                            id="file-upload"
                            type="file"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            accept="image/jpeg, image/png"
                        />
                    </label>
                </div>
            )}

            {/* Chat History Modal */}
            {showChatHistory && (
                <ChatHistory
                    onClose={() => setShowChatHistory(false)}
                    onSelectSession={handleSelectSession}
                    onCreateNewChat={handleCreateNewChat}
                />
            )}
        </div>
    );
};

export default Chatbot;