import React from 'react';
import { motion } from 'framer-motion';
import { useCertaintyStore } from '@/store/useCertaintyStore';
import { BrainCircuit } from 'lucide-react';
import '../styles/dashboard.css';

export const Dashboard: React.FC = () => {
  const currentScore = useCertaintyStore((state) => state.currentScore);
  const hasLoggedToday = useCertaintyStore((state) => state.hasLoggedToday());
  const isGeneratingInsight = useCertaintyStore(state => state.isGeneratingInsight);
  const aiInsight = useCertaintyStore(state => state.getLatestInsight());

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        {!hasLoggedToday && (
          <span className="badge warning">Reflection Pending</span>
        )}
      </header>

      <div className="dashboard-grid">
        <motion.div 
          className="card score-card"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="card-title">Certainty Score</h2>
          <div className="score-display">
            {currentScore}
          </div>
          <p className="score-status">
            {currentScore >= 76 ? 'Peak Focus' : currentScore >= 51 ? 'Stable Prep' : currentScore >= 26 ? 'High Friction' : 'Burnout Risk'}
          </p>
        </motion.div>

        <motion.div 
          className="card ai-card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ background: 'var(--text-primary)', color: 'var(--surface-color)' }}
        >
          <h2 className="card-title" style={{ color: 'var(--bg-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BrainCircuit size={20} /> Gemini Insight
          </h2>
          {isGeneratingInsight ? (
            <p style={{ opacity: 0.7 }}>Analyzing your behavioral data...</p>
          ) : aiInsight ? (
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>"{aiInsight}"</p>
          ) : (
            <p style={{ opacity: 0.7 }}>Complete your daily reflection to receive personalized AI wellness coaching.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};
