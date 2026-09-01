import { describe, expect, it } from 'vitest';
import { getUserFacingApiError } from './errorUtils';

describe('getUserFacingApiError', () => {
  it('prefers the backend detail over a generic message', () => {
    expect(
      getUserFacingApiError(
        { response: { data: { detail: 'Phone must be in E.164 format.', message: 'Validation failed.' } } },
        'Fallback message',
      ),
    ).toBe('Phone must be in E.164 format.');
  });
});
