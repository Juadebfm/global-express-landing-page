import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ShipmentCalculator from './index';

vi.mock('../../components/Header', () => ({ default: () => null }));
vi.mock('../../components/Footer', () => ({ default: () => null }));
vi.mock('../../api/publicApi', () => ({
  publicApi: {
    estimateShipment: vi.fn(),
    getShipmentTypes: vi.fn().mockResolvedValue({ data: { items: [] } }),
  },
}));

describe('ShipmentCalculator D2D delivery validation', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ data: ['Ikeja'] }) }),
    );
  });

  afterEach(() => vi.unstubAllGlobals());

  it('clears the dependent city error when a delivery state is chosen', async () => {
    const user = userEvent.setup();
    const { container } = render(<ShipmentCalculator />);

    await user.click(screen.getByRole('button', { name: 'Door-to-Door (D2D)' }));
    await user.click(screen.getByRole('button', { name: 'Compare D2D Options' }));

    const state = container.querySelector('select[name="deliveryState"]');
    const city = container.querySelector('select[name="deliveryCity"]');
    expect(state.className).toContain('border-red-600');
    expect(city.className).toContain('border-red-600');

    await user.selectOptions(state, 'Lagos State');

    expect(state.className).not.toContain('border-red-600');
    expect(city.className).not.toContain('border-red-600');
    expect(city.value).toBe('');
  });
});
