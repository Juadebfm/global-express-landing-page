import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Footer from './Footer';

vi.mock('./TurnstileWidget', () => ({
  TurnstileWidget: () => null,
}));

describe('Footer', () => {
  it('links Track Shipment to the public tracking page', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: 'Track Shipment' }).getAttribute('href')).toBe(
      '/track-shipment'
    );
  });
});
