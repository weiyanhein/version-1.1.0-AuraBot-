import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import LoginForm from './LoginForm';
import { useFooter } from './FooterContext';
import { FiArrowRight } from 'react-icons/fi';
import { getUserData } from '../utils/cookies';

const AnimatedText = ({ text, delay = 0, className = '' }) => {
  return (
    <span className={`letter-container ${className}`}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="letter"
          style={{ animationDelay: `${delay + i * 0.05}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

const HomePage = () => {
  const { darkMode } = useContext(ThemeContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const { setActiveFooterSection } = useFooter();
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    const user = getUserData();
    if (user) {
      navigate('/chat');
    } else {
      setShowForm(true);
    }
  };

  const heroImages = [
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg",
    "/images/hero4.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    setActiveFooterSection(null);
  }, [setActiveFooterSection]);

  return (
    <div className={`homepage-container ${darkMode ? 'dark' : 'light'}`}>
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${heroImages[currentImageIndex]})` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className='hero-title'>
            <h1>
              <AnimatedText text="Discover Your " />
              <span className='highlight'>
                <AnimatedText text="Perfect Skincare" delay={1.2} />
              </span>
            </h1>
          </div>
          <p className='hero-subtitle'>
            <AnimatedText text="AI-powered analysis for personalized skin care cosmetic  recommendations" delay={2.4} />
          </p>
          <button
            className="cta-button get-started-btn"
            onClick={handleGetStartedClick}
          >
            <AnimatedText text="Get Started" delay={3.6} />
            <span className="btn-icon"><FiArrowRight /></span>
          </button>
        </div>
      </section>
      {showForm && (
        <LoginForm
          onClose={() => setShowForm(false)}
          onFormSubmit={(data) => {
            console.log('Form submitted:', data);
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
};

export default HomePage;