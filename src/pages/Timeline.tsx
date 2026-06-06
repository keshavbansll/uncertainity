import React from 'react';
import { useCertaintyStore } from '@/store/useCertaintyStore';
import '../styles/dashboard.css';

export const Timeline: React.FC = () => {
  const history = useCertaintyStore(state => state.history);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Timeline</h1>
      </header>
      
      <div className="card">
        <h2 className="card-title">Historical Certainty</h2>
        {history.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No data logged yet.</p>
        ) : (
          <ul className="drift-list">
            {history.map((log, idx) => (
              <li key={idx} className="drift-item">
                <span style={{ minWidth: '100px', color: 'var(--text-secondary)' }}>{log.date}</span>
                <span style={{ fontWeight: 700 }}>{log.score}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
