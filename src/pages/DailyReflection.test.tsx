import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DailyReflection } from './DailyReflection';
import { useCertaintyStore } from '@/store/useCertaintyStore';
import { describe, it, expect, beforeEach } from 'vitest';

describe('DailyReflection Component', () => {
  beforeEach(() => {
    // Reset store before each test
    useCertaintyStore.setState({ history: [], currentScore: 50, isGeneratingInsight: false });
  });

  it('renders the first question correctly', () => {
    render(
      <MemoryRouter>
        <DailyReflection />
      </MemoryRouter>
    );
    expect(screen.getByText('Sleep Quality')).toBeInTheDocument();
  });

  it('progresses through the questionnaire and submits', async () => {
    render(
      <MemoryRouter>
        <DailyReflection />
      </MemoryRouter>
    );
    
    // Answer all 6 questions
    for (let i = 0; i < 6; i++) {
      const btns = screen.getAllByText('1.0 (High)');
      fireEvent.click(btns[btns.length - 1]);
      // Wait for Framer Motion animation to complete
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Wait for the submission to process
    await waitFor(() => {
      const state = useCertaintyStore.getState();
      expect(state.history.length).toBe(1);
    }, { timeout: 3000 });
  });
});
