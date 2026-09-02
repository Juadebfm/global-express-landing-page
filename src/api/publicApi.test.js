import { beforeEach, describe, expect, it, vi } from 'vitest';

const { get, post } = vi.hoisted(() => ({ get: vi.fn(), post: vi.fn() }));

vi.mock('./apiConfig', () => ({
  default: { get, post },
}));

import { publicApi } from './publicApi';

describe('publicApi contact contract', () => {
  beforeEach(() => {
    get.mockReset();
    post.mockReset();
  });

  it('sends the Turnstile response in the required header', async () => {
    post.mockResolvedValue({ data: { data: { id: 'contact-1' } } });

    const payload = {
      fullName: 'Jane Doe',
      email: 'jane@example.com',
      phone: '+2349000000000',
      message: 'I need help with a shipment.',
    };
    await publicApi.submitContactInquiry(payload, 'verified-turnstile-token');

    expect(post).toHaveBeenCalledWith('/public/contact', payload, {
      headers: { 'cf-turnstile-response': 'verified-turnstile-token' },
    });
  });

  it('does not expose a public D2D intake request', () => {
    expect(publicApi.submitD2DIntake).toBeUndefined();
  });

  it('normalizes an order tracking number before calling the public endpoint', async () => {
    get.mockResolvedValue({ data: { data: { trackingNumber: '20260902-AB12' } } });

    await publicApi.trackShipment(' 20260902-ab12 ');

    expect(get).toHaveBeenCalledWith('/orders/track/20260902-AB12');
  });
});
