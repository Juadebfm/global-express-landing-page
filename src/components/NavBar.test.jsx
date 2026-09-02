import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import NavBar from './NavBar';
import { DASHBOARD_URL } from '../constants/siteData';

describe('NavBar dashboard links', () => {
  it('links sign in and get started to the customer sign-in page', () => {
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
        .every((link) => link.href === `${DASHBOARD_URL}/sign-in`)
    ).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'Toggle navigation menu' }));

    const trackingLinks = screen.getAllByRole('link', { name: 'Track your shipment' });
    expect(trackingLinks).toHaveLength(2);
    expect(trackingLinks.every((link) => link.getAttribute('href') === '/track-shipment')).toBe(
      true
    );
  });
});
