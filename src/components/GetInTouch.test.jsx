import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import GetInTouch from './GetInTouch';

const { submitContactInquiry } = vi.hoisted(() => ({
  submitContactInquiry: vi.fn(),
}));

vi.mock('../api/publicApi', () => ({
  publicApi: { submitContactInquiry },
}));

vi.mock('../api/errorUtils', () => ({
  getUserFacingApiError: vi.fn(),
}));

describe('GetInTouch', () => {
  beforeEach(() => {
    submitContactInquiry.mockReset();
  });

  it('requires email and phone before the browser can submit the form', async () => {
    const user = userEvent.setup();
    render(<GetInTouch />);

    await screen.findByTestId('turnstile-dev-bypass');

    const email = screen.getByLabelText(/email/i);
    const phone = screen.getByLabelText(/phone/i);
    expect(email.required).toBe(true);
    expect(phone.required).toBe(true);

    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(submitContactInquiry).not.toHaveBeenCalled();
  });

  it('submits all backend-required fields as trimmed strings after CAPTCHA verification', async () => {
    submitContactInquiry.mockResolvedValue({});
    const user = userEvent.setup();
    render(<GetInTouch />);
    await screen.findByTestId('turnstile-dev-bypass');

    await user.type(screen.getByLabelText(/full name/i), '  Jane Doe  ');
    await user.type(screen.getByLabelText(/email/i), '  jane@example.com  ');
    await user.type(screen.getByLabelText(/phone/i), '  07063110135  ');
    await user.type(
      screen.getByLabelText(/message/i),
      '  I need help with a shipment.  '
    );
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(submitContactInquiry).toHaveBeenCalledWith(
        {
          fullName: 'Jane Doe',
          email: 'jane@example.com',
          phone: '+2347063110135',
          message: 'I need help with a shipment.',
        },
        'dev-bypass-token'
      );
    });
  });
});
