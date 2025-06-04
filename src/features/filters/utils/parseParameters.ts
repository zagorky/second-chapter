export const parseParametersToArray = (value: string) => {
  return value
    .split(',')
    .map((string) => string.trim())
    .filter((id) => id.length > 0);
};
