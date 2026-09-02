import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DASHBOARD_URL } from '../constants/siteData';
import Track from './Track';

const { trackShipment } = vi.hoisted(() => ({ trackShipment: vi.fn() }));

vi.mock('../api/publicApi', () => ({
  publicApi: { trackShipment },
}));

describe('Track', () => {
  it('normalizes the order tracking number and shows verified cargo metrics without payment data', async () => {
    trackShipment.mockResolvedValue({
      data: {
        trackingNumber: '20260902-AB12',
        statusLabel: 'In transit',
        lastLocation: 'Lagos, Nigeria',
        lastUpdate: 'Sep 2, 2026, 5:37 PM',
        timeline: [{ statusLabel: 'In transit', timestamp: '2026-09-02T17:37:00.000Z' }],
        cargoMetrics: {
          packageCount: 3,
          totalWeightKg: '108.000',
          totalCbm: '0.280500',
        },
        paymentStatus: 'paid',
        shipmentCost: { usd: '3208.50' },
      },
    });

    render(<Track />);

    fireEvent.change(screen.getByLabelText('Enter your Tracking Number'), {
      target: { value: ' 20260902-ab12 ' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Track Shipment' }));

    await waitFor(() => {
      expect(trackShipment).toHaveBeenCalledWith('20260902-AB12');
    });

    expect((await screen.findAllByText('In transit')).length).toBeGreaterThan(0);
    expect(screen.getByText('Lagos, Nigeria')).toBeTruthy();
    expect(screen.getByText('Verified Cargo Metrics')).toBeTruthy();
    expect(screen.getByText('108.000')).toBeTruthy();
    expect(screen.getByText('0.280500')).toBeTruthy();
    expect(
      screen.getByRole('link', { name: 'For more information, sign in to your dashboard' }).getAttribute('href')
    ).toBe(`${DASHBOARD_URL}/sign-in`);
    expect(screen.queryByText('Payment Status')).toBeNull();
    expect(screen.queryByText('Shipment Cost')).toBeNull();
  });

  it('does not show cargo metrics when the public response does not provide them', async () => {
    trackShipment.mockResolvedValue({
      data: {
        trackingNumber: '20260902-AB12',
        statusLabel: 'In transit',
        timeline: [],
      },
    });

    render(<Track />);

    fireEvent.change(screen.getByLabelText('Enter your Tracking Number'), {
      target: { value: '20260902-AB12' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Track Shipment' }));

    await screen.findByText('Shipment Status');

    expect(screen.queryByText('Verified Cargo Metrics')).toBeNull();
    expect(screen.queryByText('0.000')).toBeNull();
  });

  it('shows the required message when an order tracking number returns 404', async () => {
    trackShipment.mockRejectedValue({ response: { status: 404 } });

    render(<Track />);

    fireEvent.change(screen.getByLabelText('Enter your Tracking Number'), {
      target: { value: '20260901-0001' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Track Shipment' }));

    expect(await screen.findByText('Shipment not found')).toBeTruthy();
  });
});
