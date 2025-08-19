// // import React, { useState, useEffect, useRef, useContext } from 'react';
// // // Example from a previous file, adjust as needed
// // import { FaUserCircle, FaCommentDots, FaSignOutAlt,FaUser } from 'react-icons/fa';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faBars, faTimes, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
// // import { ThemeContext } from './ThemeContext';
// // import { Link,useLocation, useNavigate } from 'react-router-dom';
// // import { useFooter } from './FooterContext';
// // import { getUserData, clearUserData } from '../utils/cookies';
// // import LoginForm from './LoginForm';
// // import './NavBar.css';
// // import './LoginForm.css'
// // const NavBar = ({ onShowLoginForm }) => {
// //     const [isMenuOpen, setIsMenuOpen] = useState(false);
// //     const [scrolled, setScrolled] = useState(false);
// //     const [showUserDropdown, setShowUserDropdown] = useState(false);
// //     const [showLoginForm, setShowLoginForm] = useState(false);
// //     const [userData, setUserData] = useState(getUserData());

// //     const userDropdownRef = useRef(null);
// //     const { darkMode, toggleTheme } = useContext(ThemeContext);
// //     const location = useLocation();
// //     const navigate = useNavigate();
// //     const { setActiveFooterSection } = useFooter();

// //     const navLinks = [
// //         { name: 'Home', path: '/', section: null },
// //         { name: 'Products', path: '/products', section: null },
// //         { name: 'Services', path: '/services', section: 'services' },
// //         { name: 'About', path: '/about', section: 'about' },
// //         { name: 'Contact', path: '/contact', section: 'contact' }
// //     ];

// //     useEffect(() => {
// //         setIsMenuOpen(false);
// //     }, [location.pathname]);

// //     useEffect(() => {
// //         document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
// //     }, [darkMode]);

// //     useEffect(() => {
// //         const handleClickOutside = (event) => {
// //             if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
// //                 setShowUserDropdown(false);
// //             }
// //         };

// //         document.addEventListener('mousedown', handleClickOutside);
// //         return () => {
// //             document.removeEventListener('mousedown', handleClickOutside);
// //         };
// //     }, []);

// //     useEffect(() => {
// //         const handleScroll = () => {
// //             setScrolled(window.scrollY > 10);
// //         };

// //         window.addEventListener('scroll', handleScroll);
// //         return () => window.removeEventListener('scroll', handleScroll);
// //     }, []);

// //     const handleLoginSuccess = () => {
// //         setUserData(getUserData());
// //         setShowLoginForm(false);
// //     };

// //     const handleLogout = () => {
// //         clearUserData();
// //         setUserData(null);
// //         setShowUserDropdown(false);
// //         navigate('/');
// //     };

// //     const handleUserIconClick = () => {
// //         if (userData) {
// //             setShowUserDropdown(!showUserDropdown);
// //         } else {
// //             if (onShowLoginForm) {
// //                 onShowLoginForm();
// //             } else {
// //                 setShowLoginForm(true);
// //             }
// //         }
// //     };

// //     const handleNavClick = (path, section) => {
// //         navigate(path);
// //         if (section) {
// //             setActiveFooterSection(section);
// //             setTimeout(() => {
// //                 const footer = document.querySelector('.main-footer');
// //                 footer?.scrollIntoView({ behavior: 'smooth' });
// //             }, 100);
// //         } else {
// //             setActiveFooterSection(null);
// //         }
// //     };

// //     return (
// //         <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
// //             <div className="nav-container">
// //                 <div className="nav-left">
// //                     <button
// //                         className="hamburger"
// //                         onClick={() => setIsMenuOpen(!isMenuOpen)}
// //                         aria-label="Menu"
// //                     >
// //                         <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
// //                     </button>
// //                     <a href="/" className="brand">AI Beauty</a>
// //                     <div className="desktop-links">
// //                         {navLinks.map((link) => (
// //                             <a
// //                                 key={link.name}
// //                                 href={link.path}
// //                                 className="nav-link"
// //                                 onClick={(e) => {
// //                                     e.preventDefault();
// //                                     handleNavClick(link.path, link.section);
// //                                 }}
// //                             >
// //                                 {link.name}
// //                             </a>
// //                         ))}
// //                     </div>
// //                 </div>
// //                 <div className="nav-right">
// //                     {/* Theme Toggle Icon */}
// //                     <button
// //                         className="theme-toggle-btn"
// //                         onClick={toggleTheme}
// //                         title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
// //                     >
// //                         <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
// //                     </button>

// //                     {userData ? (
// //                         <div className="action-icons">
// //                             {/* Chat Icon */}
// //                             <Link to="/chat" className="icon-link" title="Go to Chat">
// //                                 <FaCommentDots size={22} />
// //                             </Link>

// //                             {/* User Dropdown */}
// //                             <div className="user-dropdown-container">
// //                                 <button onClick={handleUserIconClick} className="icon-link user-icon" title="My Account">
// //                                     <FaUserCircle size={24} />
// //                                 </button>
// //                 {showUserDropdown && (
// //                     <div className={`user-dropdown ${darkMode ? 'dark' : ''}`}>
// //                         {/* Dropdown content goes here */}
// //                         <div className="user-dropdown-header">
// //                             <div className="user-avatar-placeholder">
// //                                 {userData.name ? userData.name.charAt(0).toUpperCase() : ''}
// //                             </div>
// //                             <div className="user-info">
// //                                 <div className="user-name">{userData.name}</div>
// //                                 <div className="user-email">{userData.email}</div>
// //                             </div>
// //                         </div>
// //                         <div className="user-dropdown-menu">
// //                             <button onClick={handleLogout} className="dropdown-item logout-button">
// //                                 <FaSignOutAlt />
// //                                 <span>Logout</span>
// //                             </button>
// //                         </div>
// //                     </div>
// //                 )}
// //                             </div>
// //                         </div>
// //                     ) : (
// //                         // Sign In Button for non-logged-in users
// //                         <button onClick={handleUserIconClick} className="icon-link user-icon" title="Sign In">
// //                             <FaUser size={24} />
// //                             <span className="sign-in-tooltip">Sign In</span>
// //                         </button>
// //                     )}
// //                 </div>
// //             </div>

// //             {showLoginForm && !onShowLoginForm && (
// //                 <LoginForm 
// //                     onLoginSuccess={handleLoginSuccess} 
// //                     onClose={() => setShowLoginForm(false)} 
// //                 />
// //             )}

// //             <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
// //                 <div className="mobile-menu-content">
// //                     {navLinks.map((link) => (
// //                         <a
// //                             key={link.name}
// //                             href={link.path}
// //                             className="mobile-link"
// //                             onClick={(e) => {
// //                                 e.preventDefault();
// //                                 setIsMenuOpen(false);
// //                                 handleNavClick(link.path, link.section);
// //                             }}
// //                         >
// //                             {link.name}
// //                         </a>
// //                     ))}
// //                     <button
// //                         className="theme-toggle mobile"
// //                         onClick={() => {
// //                             toggleTheme();
// //                             setIsMenuOpen(false);
// //                         }}
// //                     >
// //                         <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
// //                     </button>
// //                 </div>
// //             </div>
// //         </nav>
// //     );
// // };

// // export default NavBar;

// import React, { useState, useEffect, useRef, useContext } from 'react';
// import { FaUserCircle, FaCommentDots, FaSignOutAlt, FaUser } from 'react-icons/fa';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faTimes, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
// import { ThemeContext } from './ThemeContext';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useFooter } from './FooterContext';
// import { getUserData, clearUserData } from '../utils/cookies';
// import LoginForm from './LoginForm';
// import './NavBar.css';
// import './LoginForm.css';

// const NavBar = ({ onShowLoginForm }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [showUserDropdown, setShowUserDropdown] = useState(false);
//   const [showLoginForm, setShowLoginForm] = useState(false);
//   const [userData, setUserData] = useState(getUserData());
  
//   // NEW: State for the login success modal
//   const [showLoginSuccessModal, setShowLoginSuccessModal] = useState(false);

//   const userDropdownRef = useRef(null);
//   const { darkMode, toggleTheme } = useContext(ThemeContext);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { setActiveFooterSection } = useFooter();

//   const navLinks = [
//     { name: 'Home', path: '/', section: null },
//     { name: 'Products', path: '/products', section: null },
//     { name: 'Services', path: '/services', section: 'services' },
//     { name: 'About', path: '/about', section: 'about' },
//     { name: 'Contact', path: '/contact', section: 'contact' }
//   ];

//   useEffect(() => {
//     setIsMenuOpen(false);
//   }, [location.pathname]);

//   useEffect(() => {
//     document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
//   }, [darkMode]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
//         setShowUserDropdown(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleLoginSuccess = (userData) => {
//     setUserData(userData);
//     setShowLoginForm(false); // Close the login form
//     setShowLoginSuccessModal(true); // Show the success modal
    
//     // Auto-close the success modal and navigate after a delay
//     setTimeout(() => {
//       setShowLoginSuccessModal(false);
//       navigate('/chat', { state: { userData: userData } });
//     }, 2000); // 2-second delay
//   };

//   const handleLogout = () => {
//     clearUserData();
//     setUserData(null);
//     setShowUserDropdown(false);
//     navigate('/');
//   };

//   const handleUserIconClick = () => {
//     if (userData) {
//       setShowUserDropdown(!showUserDropdown);
//     } else {
//       setShowLoginForm(true);
//     }
//   };

//   const handleNavClick = (path, section) => {
//     navigate(path);
//     if (section) {
//       setActiveFooterSection(section);
//       setTimeout(() => {
//         const footer = document.querySelector('.main-footer');
//         footer?.scrollIntoView({ behavior: 'smooth' });
//       }, 100);
//     } else {
//       setActiveFooterSection(null);
//     }
//   };

//   return (
//     <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
//       <div className="nav-container">
//         <div className="nav-left">
//           <button
//             className="hamburger"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             aria-label="Menu"
//           >
//             <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
//           </button>
//           <a href="/" className="brand">AI Beauty</a>
//           <div className="desktop-links">
//             {navLinks.map((link) => (
//               <a
//                 key={link.name}
//                 href={link.path}
//                 className="nav-link"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handleNavClick(link.path, link.section);
//                 }}
//               >
//                 {link.name}
//               </a>
//             ))}
//           </div>
//         </div>
//         <div className="nav-right">
//           <button
//             className="theme-toggle-btn"
//             onClick={toggleTheme}
//             title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
//           >
//             <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
//           </button>
//           {userData ? (
//             <div className="action-icons">
//               <Link to="/chat" className="icon-link" title="Go to Chat">
//                 <FaCommentDots size={22} />
//               </Link>
//               <div className="user-dropdown-container" ref={userDropdownRef}>
//                 <button onClick={handleUserIconClick} className="icon-link user-icon" title="My Account">
//                   <FaUserCircle size={24} />
//                 </button>
//                 {showUserDropdown && (
//                   <div className={`user-dropdown ${darkMode ? 'dark' : ''}`}>
//                     <div className="user-dropdown-header">
//                       <div className="user-avatar-placeholder">
//                         {userData.name ? userData.name.charAt(0).toUpperCase() : ''}
//                       </div>
//                       <div className="user-info">
//                         <div className="user-name">{userData.name}</div>
//                         <div className="user-email">{userData.email}</div>
//                       </div>
//                     </div>
//                     <div className="user-dropdown-menu">
//                       <button onClick={handleLogout} className="dropdown-item logout-button">
//                         <FaSignOutAlt />
//                         <span>Logout</span>
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <button onClick={handleUserIconClick} className="icon-link user-icon" title="Sign In">
//               <FaUser size={24} className="fausericon" />
//               <span className="sign-in-tooltip">Sign In</span>
//             </button>
//           )}
//         </div>
//       </div>
      
//       {/* Login Form Modal */}
//       {showLoginForm && (
//         <LoginForm
//           onLoginSuccess={handleLoginSuccess}
//           onClose={() => setShowLoginForm(false)}
//         />
//       )}

//       {/* NEW: Login Successful Modal */}
//       {showLoginSuccessModal && (
//         <div className="login-modal-overlay success-overlay">
//           <div className="login-modal success-modal">
//             <div className="success-icon">
//               <FaCommentDots size={50} color="#4CAF50" />
//             </div>
//             <div className="success-message-text">
//               <h3>Login Successful!</h3>
//               <p>You'll be redirected to the chat in a moment.</p>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
//         <div className="mobile-menu-content">
//           {navLinks.map((link) => (
//             <a
//               key={link.name}
//               href={link.path}
//               className="mobile-link"
//               onClick={(e) => {
//                 e.preventDefault();
//                 setIsMenuOpen(false);
//                 handleNavClick(link.path, link.section);
//               }}
//             >
//               {link.name}
//             </a>
//           ))}
//           <button
//             className="theme-toggle mobile"
//             onClick={() => {
//               toggleTheme();
//               setIsMenuOpen(false);
//             }}
//           >
//             <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;

import React, { useState, useEffect, useRef, useContext } from 'react';
import { FaUserCircle, FaCommentDots, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from './ThemeContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFooter } from './FooterContext';
import { getUserData, clearUserData } from '../utils/cookies';
import LoginForm from './LoginForm';
import Modal from './Modal'; // Add this import
import './NavBar.css';
import './LoginForm.css';

const NavBar = ({ onShowLoginForm }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [userData, setUserData] = useState(getUserData());
  const [showLoginSuccessModal, setShowLoginSuccessModal] = useState(false);

  const userDropdownRef = useRef(null);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { setActiveFooterSection } = useFooter();

  const navLinks = [
    { name: 'Home', path: '/', section: null },
    { name: 'Products', path: '/products', section: null },
    { name: 'Services', path: '/services', section: 'services' },
    { name: 'About', path: '/about', section: 'about' },
    { name: 'Contact', path: '/contact', section: 'contact' }
  ];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginSuccess = (userData) => {
    setUserData(userData);
    setShowLoginForm(false);
    setShowLoginSuccessModal(true);
    
    setTimeout(() => {
      setShowLoginSuccessModal(false);
      navigate('/chat', { state: { userData: userData } });
    }, 2000);
  };

  const handleLogout = () => {
    clearUserData();
    setUserData(null);
    setShowUserDropdown(false);
    navigate('/');
  };

  const handleUserIconClick = () => {
    if (userData) {
      setShowUserDropdown(!showUserDropdown);
    } else {
      setShowLoginForm(true);
    }
  };

  const handleNavClick = (path, section) => {
    navigate(path);
    if (section) {
      setActiveFooterSection(section);
      setTimeout(() => {
        const footer = document.querySelector('.main-footer');
        footer?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setActiveFooterSection(null);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-left">
          <button
            className="hamburger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </button>
          <a href="/" className="brand">AuraBot</a>
          <div className="desktop-links">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.path, link.section);
                }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
        <div className="nav-right">
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
          </button>
          {userData ? (
            <div className="action-icons">
              <Link to="/chat" className="icon-link" title="Go to Chat">
                <FaCommentDots size={22} />
              </Link>
              <div className="user-dropdown-container" ref={userDropdownRef}>
                <button onClick={handleUserIconClick} className="icon-link user-icon" title="My Account">
                  <FaUserCircle size={24} />
                </button>
                {showUserDropdown && (
                  <div className={`user-dropdown ${darkMode ? 'dark' : ''}`}>
                    <div className="user-dropdown-header">
                      <div className="user-avatar-placeholder">
                        {userData.name ? userData.name.charAt(0).toUpperCase() : ''}
                      </div>
                      <div className="user-info">
                        <div className="user-name">{userData.name}</div>
                        <div className="user-email">{userData.email}</div>
                      </div>
                    </div>
                    <div className="user-dropdown-menu">
                      <button onClick={handleLogout} className="dropdown-item logout-button">
                        <FaSignOutAlt />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button onClick={handleUserIconClick} className="icon-link user-icon" title="Sign In">
              <FaUser size={24} className="fausericon" />
              <span className="sign-in-tooltip">Sign In</span>
            </button>
          )}
        </div>
      </div>
      
      {/* NEW: Login Form Modal is now wrapped in the Modal component */}
      {showLoginForm && (
        <Modal>
          <LoginForm
            onLoginSuccess={handleLoginSuccess}
            onClose={() => setShowLoginForm(false)}
          />
        </Modal>
      )}

      {/* NEW: Login Successful Modal is now wrapped in the Modal component */}
      {showLoginSuccessModal && (
        <Modal>
          <div className="login-modal-overlay success-overlay">
            <div className="login-modal success-modal">
              <div className="success-icon">
                <FaCommentDots size={50} color="#4CAF50" />
              </div>
              <div className="success-message-text">
                <h3>Login Successful!</h3>
                <p>You'll be redirected to the chat in a moment.</p>
              </div>
            </div>
          </div>
        </Modal>
      )}

      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="mobile-link"
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
                handleNavClick(link.path, link.section);
              }}
            >
              {link.name}
            </a>
          ))}
          <button
            className="theme-toggle mobile"
            onClick={() => {
              toggleTheme();
              setIsMenuOpen(false);
            }}
          >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;