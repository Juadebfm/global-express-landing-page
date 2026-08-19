import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import NavBar from './NavBar';
import { DASHBOARD_URL } from '../constants/siteData';

vi.mock('../hooks/useFeatureAccess', () => ({
  useFeatureAccess: () => ({ openFeatureModal: vi.fn() }),
}));

describe('NavBar dashboard links', () => {
  it('links sign in and get started to the dashboard', () => {
    render(
      <MemoryRouter>
        <NavBar isScrolled={false} />
      </MemoryRouter>
    );

    expect(
      screen
        .getAllByRole('link', { name: 'Sign in' })
        .every((link) => link.href === `${DASHBOARD_URL}/sign-in`)
    ).toBe(true);
    expect(
      screen
        .getAllByRole('link', { name: 'Get Started' })
        .every((link) => link.href === `${DASHBOARD_URL}/sign-up`)
    ).toBe(true);
  });
});
