export const buildSearchQueryParameters = (value: string) => {
  if (!value) return {};

  return {
    'text.en-GB': `*${value}*`,
    fuzzy: true,
    fuzzyLevel: 1,
  };
};
