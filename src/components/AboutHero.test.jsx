import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import AboutHero from './AboutHero';
import { DASHBOARD_URL } from '../constants/siteData';

describe('AboutHero', () => {
  it('links Get Started to customer sign-in', () => {
    render(<AboutHero />, { wrapper: MemoryRouter });

    expect(screen.getByRole('link', { name: 'Get Started' }).href).toBe(
      `${DASHBOARD_URL}/sign-in`,
    );
  });
});
