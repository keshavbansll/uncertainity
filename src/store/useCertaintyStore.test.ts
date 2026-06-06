import { describe, it, expect, beforeEach } from 'vitest';
import { useCertaintyStore } from './useCertaintyStore';

describe('Certainty Engine (useCertaintyStore)', () => {
  beforeEach(() => {
    // Reset state before each test
    useCertaintyStore.setState({ currentScore: 50, history: [] });
  });

  it('should initialize with a default score of 50', () => {
    const { currentScore, history } = useCertaintyStore.getState();
    expect(currentScore).toBe(50);
    expect(history.length).toBe(0);
  });

  it('should calculate the correct score when all signals are optimal', async () => {
    const { submitDailyLog } = useCertaintyStore.getState();
    
    await submitDailyLog({
      sleep: 1,
      focus: 1,
      mood: 1,
      burnout: 0, // Optimal is 0
      stress: 0,
      selfDoubt: 0
    });

    const { currentScore, history } = useCertaintyStore.getState();
    expect(currentScore).toBe(100);
    expect(history.length).toBe(1);
    expect(history[0].score).toBe(100);
  });

  it('should calculate the correct score when signals are poor', async () => {
    const { submitDailyLog } = useCertaintyStore.getState();
    
    await submitDailyLog({
      sleep: 0,
      focus: 0,
      mood: 0,
      burnout: 1, // Poor is 1
      stress: 1,
      selfDoubt: 1
    });

    const { currentScore } = useCertaintyStore.getState();
    expect(currentScore).toBe(0);
  });

  it('should correctly identify if log has been submitted today', async () => {
    const store = useCertaintyStore.getState();
    expect(store.hasLoggedToday()).toBe(false);

    await useCertaintyStore.getState().submitDailyLog({
      sleep: 0.5, focus: 0.5, mood: 0.5, burnout: 0.5, stress: 0.5, selfDoubt: 0.5
    });

    expect(useCertaintyStore.getState().hasLoggedToday()).toBe(true);
  });
});
