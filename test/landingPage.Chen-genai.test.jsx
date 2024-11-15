import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from '../src/pages/landingPage/landingPage';

describe('Landing Page Navigation', () => {
  it('should show navigation options', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    // Check for the main header elements
    const welcomeText = screen.getByText(/welcome to/i);
    const oHoursText = screen.getByText('OHours');
    expect(welcomeText).toBeInTheDocument();
    expect(oHoursText).toBeInTheDocument();

    // Check for navigation links
    const studentLink = screen.getByRole('link', { name: /students/i });
    const staffLink = screen.getByRole('link', { name: /staff/i });
    expect(studentLink).toHaveAttribute('href', '/student');
    expect(staffLink).toHaveAttribute('href', '/PMLand');
  });
});