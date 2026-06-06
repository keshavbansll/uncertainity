import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('App Root', () => {
  it('renders without crashing and shows the landing page', () => {
    render(<App />);
    expect(screen.getByText('Keshav Bansll')).toBeInTheDocument();
  });
});
