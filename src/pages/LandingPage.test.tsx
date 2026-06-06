import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LandingPage } from './LandingPage';

describe('LandingPage Component', () => {
  it('renders the branding correctly', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    // Verify main text elements
    expect(screen.getByText('Uncertainty')).toBeInTheDocument();
    expect(screen.getByText('NEVER LET YOUR LIFE DRIFT APART...')).toBeInTheDocument();
    expect(screen.getByText("India's 1st Wellness Tracker")).toBeInTheDocument();
  });

  it('renders author pill and hashtags', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Keshav Bansll')).toBeInTheDocument();
    expect(screen.getByText('#PromptWars #GoogleDevelopersGroup #Hack2Skill')).toBeInTheDocument();
  });

  it('renders the Enter Dashboard button', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    const btn = screen.getByRole('button', { name: /enter dashboard/i });
    expect(btn).toBeInTheDocument();
  });
});
