import { parseParametersToArray } from '~features/filters/utils/parseParameters';

export const buildCategoryQueryParameters = (subcategory: string, category: string) => {
  const filters: string[] = [];

  const allCategories = [...parseParametersToArray(category), ...parseParametersToArray(subcategory)];

  if (allCategories.length > 0) {
    const categoryFilters = allCategories.map((id) => `categories.id:subtree("${id}")`);

    filters.push(...categoryFilters);
  }

  return filters.length > 0 ? { 'filter.query': filters } : {};
};
