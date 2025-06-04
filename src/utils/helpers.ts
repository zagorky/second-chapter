export function assertIsNonNullable<T>(value: unknown, ...infos: unknown[]): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`Nullish assertion Error: "${String(value)}"; ${infos.join(' ')}`);
  }
}

export const withDataTestId = (testID: string) => {
  return {
    'data-testid': testID,
  };
};

export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};
