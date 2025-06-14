import { formatPrice } from './formatPrice';

describe('formatPrice', () => {
  it('should converts pence to pounds correctly', () => {
    expect(formatPrice(1000)).toBe('£ 10.00');
  });
  it('should formats with exactly two decimal places', () => {
    expect(formatPrice(123)).toBe('£ 1.23');
  });
  it('should handles floating point pence values', () => {
    expect(formatPrice(12.11)).toBe('£ 0.12');
  });
  it('should handle zero price', () => {
    expect(formatPrice(0)).toBe('Free');
  });
  it('should handles negative numbers', () => {
    expect(formatPrice(-100)).toBe('Incorrect Price');
  });
});
