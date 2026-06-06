import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateWellnessInsight } from '../lib/gemini';

export type SignalLogs = {
  sleep: number;      // 0 to 1 (1 = 8+ hours well rested)
  focus: number;      // 0 to 1 (1 = deep work achieved)
  mood: number;       // 0 to 1 (1 = highly positive/motivated)
  burnout: number;    // 0 to 1 (1 = severely burnt out, inverted)
  stress: number;     // 0 to 1 (1 = high exam anxiety, inverted)
  selfDoubt: number;  // 0 to 1 (1 = high imposter syndrome, inverted)
};

export type DailyLog = {
  date: string;
  signals: SignalLogs;
  score: number;
  aiInsight?: string;
};

type CertaintyState = {
  currentScore: number;
  history: DailyLog[];
  isGeneratingInsight: boolean;
  hasLoggedToday: () => boolean;
  submitDailyLog: (signals: SignalLogs) => Promise<void>;
  getLatestInsight: () => string | null;
};

const calculateScore = (signals: SignalLogs): number => {
  const weights = {
    sleep: 0.20,
    focus: 0.25,
    mood: 0.15,
    burnout: 0.15,    // Inverted logic
    stress: 0.15,     // Inverted logic
    selfDoubt: 0.10   // Inverted logic
  };

  const rawScore = 
    (signals.sleep * weights.sleep) +
    (signals.focus * weights.focus) +
    (signals.mood * weights.mood) +
    ((1 - signals.burnout) * weights.burnout) +
    ((1 - signals.stress) * weights.stress) +
    ((1 - signals.selfDoubt) * weights.selfDoubt);

  return Math.round(rawScore * 100);
};

const getTodayString = () => new Date().toISOString().split('T')[0];

export const useCertaintyStore = create<CertaintyState>()(
  persist(
    (set, get) => ({
      currentScore: 50,
      history: [],
      isGeneratingInsight: false,
      
      hasLoggedToday: () => {
        const today = getTodayString();
        return get().history.some(log => log.date === today);
      },

      getLatestInsight: () => {
        const history = get().history;
        if (history.length === 0) return null;
        return history[history.length - 1].aiInsight || null;
      },

      submitDailyLog: async (signals: SignalLogs) => {
        const newScore = calculateScore(signals);
        const today = getTodayString();
        
        // Optimistic update
        set((state) => {
          const filteredHistory = state.history.filter(log => log.date !== today);
          return {
            isGeneratingInsight: true,
            currentScore: newScore,
            history: [...filteredHistory, { date: today, signals, score: newScore }].sort((a, b) => a.date.localeCompare(b.date))
          };
        });

        // Async AI processing
        const insight = await generateWellnessInsight(signals, newScore);

        // Update with AI insight
        set((state) => {
          const updatedHistory = state.history.map(log => 
            log.date === today ? { ...log, aiInsight: insight } : log
          );
          return {
            isGeneratingInsight: false,
            history: updatedHistory
          };
        });
      }
    }),
    {
      name: 'uncertainty:state:v2', // v2 to reset old test data
    }
  )
);
