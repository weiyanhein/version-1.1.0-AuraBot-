// import React from 'react';
// import { useFooter } from './FooterContext';
// import './Footer.css';

// const Footer = () => {
//   const { activeFooterSection } = useFooter();

//   const sectionContent = {
//     services: {
//       title: "Our Services",
//       content: (
//         <>
//           <p>Discover our premium beauty solutions:</p>
//           <ul>
//             <li>AI Skin Analysis</li>
//             <li>Personalized Product Matching</li>
//             <li>Virtual Makeup Try-On</li>
//             <li>Skincare Routine Builder</li>
//           </ul>
//         </>
//       )
//     },
//     about: {
//       title: "About Us",
//       content: (
//         <>
//           <p className="mission-statement">
//             Founded in {new Date().getFullYear()}, we revolutionize our beauty through technology.
//           </p>
//           <p>AuraBot is an AI-powered beauty assistant designed to help you discover and enhance your unique beauty.</p>
//           <p>We created AuraBot to provide personalized beauty solutions for everyone.</p>
//           <p>Every person should be unique with their own beauty.</p>
         
//         </>
//       )
//     },
//     contact: {
//       title: "Contact Us",
//       content: (
//         <div className="contact-details">
//           <p>Email: AuraBot@gmail.com</p>
//           <p>Phone:09440690975</p>
//           <p>Address: AuraBot Lane, AI atmosphere</p>
//         </div>
//       )
//     },
//     privacy: {
//       title: "Privacy Policy",
//       content: (
//         <>
//           <p>Your data security is our priority.</p>
//           <div className="legal-links">
//             <a href="/privacy">Full Policy</a>
//             <span>•</span>
//             <a href="/cookies">Cookie Settings</a>
//           </div>
//         </>
//       )
//     }
//   };

//   return (
//     <footer className="main-footer">
//       <div className="footer-container">
//         {activeFooterSection ? (
//           <div className="footer-section highlighted">
//             <h3>{sectionContent[activeFooterSection].title}</h3>
//             {sectionContent[activeFooterSection].content}
//           </div>
//         ) : (
//           <div className="footer-default">
//             <p>© {new Date().getFullYear()} AuraBot </p>
//             <div className="legal-links">
//             </div>
//           </div>
//         )}
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React, { useState } from 'react';
import { useFooter } from './FooterContext';
import './Footer.css';

const Footer = () => {
  const { activeFooterSection } = useFooter();
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  const developers = [
    {
      id: 1,
      name: "John Doe",
      role: "Frontend Developer",
      bio: "Specializes in React and UI/UX design with 5 years of experience.",
      email: "john@aurabot.com",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Backend Developer",
      bio: "Expert in Node.js and database architecture with a focus on scalability.",
      email: "jane@aurabot.com",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 3,
      name: "Alex Johnson",
      role: "Full Stack Developer",
      bio: "Passionate about creating seamless user experiences from front to back.",
      email: "alex@aurabot.com",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: 4,
      name: "Sarah Williams",
      role: "UI/UX Designer",
      bio: "Creates beautiful and intuitive interfaces that users love.",
      email: "sarah@aurabot.com",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      id: 5,
      name: "Michael Brown",
      role: "DevOps Engineer",
      bio: "Ensures our systems run smoothly and securely in the cloud.",
      email: "michael@aurabot.com",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg"
    }
  ];

  const openTeamModal = () => {
    setIsTeamModalOpen(true);
  };

  const closeTeamModal = () => {
    setIsTeamModalOpen(false);
  };

  const sectionContent = {
    services: {
      title: "Our Services",
      content: (
        <>
          <p>Discover our premium beauty solutions:</p>
          <ul>
            <li>AI Skin Analysis</li>
            <li>Personalized Cosmetic Recommendation</li>
            <li>Skincare Guidelines Suggestion</li>
          </ul>
        </>
      )
    },
    about: {
      title: "About Us",
      content: (
        <>
          <p className="mission-statement">
            Borned in {new Date().getFullYear()}, we revolutionize our beauty through technology.
          </p>
          <p>AuraBot is an AI-powered beauty assistant designed to help you discover and enhance your unique beauty.</p>
          <p>We created AuraBot to provide personalized beauty solutions for everyone.</p>
          <p>Every person should be unique with their own beauty.</p>
          
          <button className="meet-team-btn" onClick={openTeamModal}>
            Meet Our Team
          </button>
        </>
      )
    },
    contact: {
      title: "Contact Us",
      content: (
        <div className="contact-details">
          <p>Email: AuraBot@gmail.com</p>
          <p>Phone:09440690975</p>
          <p>Address: AuraBot Lane, AI atmosphere</p>
        </div>
      )
    },
    privacy: {
      title: "Privacy Policy",
      content: (
        <>
          <p>Your data security is our priority.</p>
          <div className="legal-links">
            <a href="/privacy">Full Policy</a>
            <span>•</span>
            <a href="/cookies">Cookie Settings</a>
          </div>
        </>
      )
    }
  };

  return (
    <footer className="main-footer">
      <div className="footer-container">
        {activeFooterSection ? (
          <div className="footer-section highlighted">
            <h3>{sectionContent[activeFooterSection].title}</h3>
            {sectionContent[activeFooterSection].content}
          </div>
        ) : (
          <div className="footer-default">
            <p>© {new Date().getFullYear()} AuraBot </p>
            <div className="legal-links">
            </div>
          </div>
        )}
      </div>

      {/* Team Modal */}
      {isTeamModalOpen && (
        <div className="modal-overlay" onClick={closeTeamModal}>
          <div className="team-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeTeamModal}>
              &times;
            </button>
            <h3>Our Development Team</h3>
            <div className="developers-grid">
              {developers.map(developer => (
                <div key={developer.id} className="developer-card">
                  <img src={developer.avatar} alt={developer.name} />
                  <h4>{developer.name}</h4>
                  <p className="role">{developer.role}</p>
                  <p className="bio">{developer.bio}</p>
                  <p className="email">
                    <a href={`mailto:${developer.email}`}>{developer.email}</a>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;