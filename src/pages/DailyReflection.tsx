import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCertaintyStore, type SignalLogs } from '@/store/useCertaintyStore';
import '../styles/reflection.css';

const QUESTIONS = [
  { id: 'sleep', title: 'Sleep Quality', desc: 'Did you get 7-8 hours of restful sleep?' },
  { id: 'focus', title: 'Study Focus', desc: 'Were you able to maintain deep focus during study blocks?' },
  { id: 'mood', title: 'Overall Mood', desc: 'How positive and motivated do you feel today?' },
  { id: 'burnout', title: 'Burnout Check', desc: 'Are you feeling exhausted or cynical about your prep? (1 = High Burnout)' },
  { id: 'stress', title: 'Exam Anxiety', desc: 'How stressed are you feeling about your syllabus/exams? (1 = Very Stressed)' },
  { id: 'selfDoubt', title: 'Imposter Syndrome', desc: 'Are you doubting your capability to succeed? (1 = High Doubt)' }
];

export const DailyReflection: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Partial<SignalLogs>>({});
  const submitDailyLog = useCertaintyStore(state => state.submitDailyLog);
  const navigate = useNavigate();

  const handleAnswer = async (value: number) => {
    const qId = QUESTIONS[currentIdx].id as keyof SignalLogs;
    const newAnswers = { ...answers, [qId]: value };
    setAnswers(newAnswers);

    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // Finished
      await submitDailyLog(newAnswers as SignalLogs);
      navigate('/dashboard');
    }
  };

  const question = QUESTIONS[currentIdx];
  if (!question) return null;

  return (
    <main className="reflection-container" aria-label="Daily reflection questionnaire">
      <div className="reflection-card card">
        <div 
          className="progress-bar" 
          role="progressbar" 
          aria-valuenow={Math.round((currentIdx / QUESTIONS.length) * 100)} 
          aria-valuemin={0} 
          aria-valuemax={100}
          aria-label="Reflection Progress"
        >
          <div 
            className="progress-fill" 
            style={{ width: `${((currentIdx) / QUESTIONS.length) * 100}%` }} 
          />
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.15 }}
            className="question-block"
            role="group"
            aria-labelledby={`question-${currentIdx}`}
            aria-live="polite"
          >
            <h2 id={`question-${currentIdx}`} className="question-title">{question.title}</h2>
            <p className="question-desc">{question.desc}</p>
            
            <div className="options-grid">
              <button className="btn-option" onClick={() => handleAnswer(0)} aria-label="Score: 0 - Low">0 (Low)</button>
              <button className="btn-option" onClick={() => handleAnswer(0.5)} aria-label="Score: 0.5 - Mid">0.5 (Mid)</button>
              <button className="btn-option" onClick={() => handleAnswer(1)} aria-label="Score: 1.0 - High">1.0 (High)</button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
};
