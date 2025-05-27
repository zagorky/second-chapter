import { parseParametersToArray } from '~features/filters/utils/parseParameters';

export const buildCategoryQueryParameters = (subcategory: string, category: string) => {
  const allCategories = [...parseParametersToArray(category), ...parseParametersToArray(subcategory)];

  if (allCategories.length === 0) return {};

  const filters = `categories.id:${allCategories.map((id) => `"${id}"`).join(',')}`;

  return {
    filter: filters,
  };
};
