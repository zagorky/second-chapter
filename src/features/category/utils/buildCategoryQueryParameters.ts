import { parseParametersToArray } from '~features/filters/utils/parseParameters';

export const buildCategoryQueryParameters = (subcategory: string, category: string) => {
  const filters: string[] = [];

  const allCategories = [...parseParametersToArray(category), ...parseParametersToArray(subcategory)];

  if (allCategories.length > 0) {
    filters.push(`categories.id:subtree(${allCategories.map((id) => `"${id}"`).join(',')})`);
  }

  return filters.length > 0 ? { 'filter.query': filters } : {};
};
