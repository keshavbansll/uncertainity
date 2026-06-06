import { render, screen } from '@testing-library/react';
import { Layout } from './Layout';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

describe('Layout Component', () => {
  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    // Adjust based on the actual text in Layout.tsx
    // Often it contains "Dashboard" or similar navigation text.
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
