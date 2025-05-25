export const buildSearchQueryParameters = (value: string) => {
  return value === ''
    ? {}
    : {
        'text.en-GB': `*${value}*`,
        fuzzy: true,
        fuzzyLevel: 1,
      };
};
