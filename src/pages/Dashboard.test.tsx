import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Dashboard } from './Dashboard';
import { useCertaintyStore } from '../store/useCertaintyStore';

describe('Dashboard Component', () => {
  beforeEach(() => {
    useCertaintyStore.setState({
      currentScore: 85,
      history: []
    });
  });

  it('renders the Dashboard header and score correctly', () => {
    render(<Dashboard />);
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('85')).toBeInTheDocument(); // The score
    expect(screen.getByText('Peak Focus')).toBeInTheDocument(); // The status
  });

  it('shows Reflection Pending badge when no log exists for today', () => {
    useCertaintyStore.setState({ history: [] }); // Empty history
    render(<Dashboard />);
    
    expect(screen.getByText('Reflection Pending')).toBeInTheDocument();
  });
});
