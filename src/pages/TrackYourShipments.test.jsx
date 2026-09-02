import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import TrackYourShipments from './TrackYourShipments';

vi.mock('../components/Header', () => ({
  default: () => <div data-testid="header" />,
}));

vi.mock('../components/Footer', () => ({
  default: () => <div data-testid="footer" />,
}));

vi.mock('../components/Track', () => ({
  default: () => <div data-testid="tracking-content" />,
}));

describe('TrackYourShipments', () => {
  it('uses the shared header and footer around the tracking content', () => {
    render(<TrackYourShipments />);

    expect(screen.getByTestId('header')).toBeTruthy();
    expect(screen.getByTestId('tracking-content')).toBeTruthy();
    expect(screen.getByTestId('footer')).toBeTruthy();
  });
});
