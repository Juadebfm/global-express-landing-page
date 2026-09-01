import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import HomeHero from './HomeHero';
import { DASHBOARD_URL } from '../constants/siteData';

describe('HomeHero', () => {
  afterEach(() => vi.useRealTimers());

  it('links Get Started to customer sign-in', () => {
    vi.useFakeTimers();
    render(<HomeHero />, { wrapper: MemoryRouter });

    expect(screen.getByRole('link', { name: 'Get Started' }).href).toBe(
      `${DASHBOARD_URL}/sign-in`,
    );
  });
});
