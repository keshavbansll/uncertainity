import { GoogleGenAI } from '@google/genai';
import type { SignalLogs } from '../store/useCertaintyStore';

// In a real MAANG production environment, this call would happen on a secure backend route
// to protect the API key. For this launch-ready MVP, we use the env variable.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Fallback logic in case the key isn't provided during local dev
export const generateWellnessInsight = async (signals: SignalLogs, score: number): Promise<string> => {
  if (!apiKey) {
    return `[API Key Missing] Your Certainty Score is ${score}. Remember that burnout (${(signals.burnout * 100).toFixed(0)}%) and stress (${(signals.stress * 100).toFixed(0)}%) are high priorities right now. Take a moment to breathe.`;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `
      You are a highly empathetic, expert student wellness counselor specializing in students preparing for high-stakes exams (like NEET, JEE, UPSC).
      The student has just submitted their daily reflection.
      
      Their current data (0 to 1 scale, where 1 is optimal, except burnout, stress, and selfDoubt where 1 is severe):
      - Sleep Quality: ${signals.sleep}
      - Focus/Study Intensity: ${signals.focus}
      - Mood: ${signals.mood}
      - Burnout Level: ${signals.burnout}
      - Stress Level: ${signals.stress}
      - Self Doubt: ${signals.selfDoubt}
      - Overall Certainty Score: ${score}/100
      
      Provide a highly personalized, actionable, and comforting 2-sentence piece of advice to help them navigate their preparation journey.
      Keep it professional, encouraging, and directly related to their data. No emojis.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5',
      contents: prompt,
    });

    return response.text || 'Keep pushing forward steadily. Remember to balance your effort with recovery.';
  } catch (error) {
    console.error('Gemini API Error:', error);
    return 'We had trouble reaching your AI counselor. Ensure you are resting adequately and maintaining a steady pace.';
  }
};
