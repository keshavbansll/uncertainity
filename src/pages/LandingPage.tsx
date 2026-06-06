import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/landing.css';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="author-pill">
          <span className="code-icon">&lt;/&gt;</span>
          <span>Keshav Bansll</span>
        </div>
        <div className="hashtag-list">
          #PromptWars #GoogleDevelopersGroup #Hack2Skill
        </div>
      </header>

      <main className="landing-main">
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Uncertainty
        </motion.h1>
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          NEVER LET YOUR LIFE DRIFT APART...
        </motion.p>

        <div className="landing-bottom">
          <div className="bottom-left">
            <h2 className="tracker-title">India's 1st Wellness Tracker</h2>
            <button 
              className="brutalist-btn" 
              onClick={() => navigate('/dashboard')}
            >
              Enter Dashboard
              <div className="scratch-lines">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </button>
          </div>

          <div className="carousel-section">
            <button className="carousel-arrow">&lt;</button>
            <div className="cards-stack">
              <div className="card-item card-1"></div>
              <div className="card-item card-main"></div>
              <div className="card-item card-2"></div>
            </div>
            <button className="carousel-arrow">&gt;</button>
          </div>
        </div>

        {/* Discotive-inspired Structure Below the Fold */}
        <section className="ld-sec">
          <div className="ld-sec-in">
            <div className="ld-section-label">THE ENGINE</div>
            <h2 className="ld-h2">Your mind is a complex system.<br /><span className="dim">We decode it.</span></h2>
            
            <div className="ld-features-grid">
              <div className="ld-feat">
                <div className="ld-feat-icon">🧠</div>
                <h3 className="ld-feat-title">AI Wellness Coach</h3>
                <p className="ld-feat-body">Gemini analyzes your burnout, stress, and mood to provide deeply personalized feedback on your preparation journey.</p>
              </div>
              <div className="ld-feat">
                <div className="ld-feat-icon">📊</div>
                <h3 className="ld-feat-title">Certainty Score™</h3>
                <p className="ld-feat-body">A singular, quantifiable metric tracking your stability across sleep, focus, and self-doubt metrics.</p>
              </div>
              <div className="ld-feat">
                <div className="ld-feat-icon">⚡</div>
                <h3 className="ld-feat-title">High-Stakes Ready</h3>
                <p className="ld-feat-body">Designed specifically for the intense pressure of NEET, JEE, and UPSC examinations.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
