import { validateSortKey } from '~features/sort/utils/validateSortKey';

export const buildSortQueryParameters = (value: string) => {
  if (!value) return {};
  const validSortParameter = validateSortKey(value);

  return validSortParameter.requiresCurrency
    ? { sort: validSortParameter.commercetoolsParameter, priceCurrency: 'GBP' }
    : { sort: validSortParameter.commercetoolsParameter };
};
