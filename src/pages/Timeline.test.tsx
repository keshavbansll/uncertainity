import { render, screen } from '@testing-library/react';
import { Timeline } from './Timeline';
import { describe, it, expect } from 'vitest';

describe('Timeline Component', () => {
  it('renders the timeline header', () => {
    render(<Timeline />);
    expect(screen.getByText(/Timeline/i)).toBeInTheDocument();
  });
});
