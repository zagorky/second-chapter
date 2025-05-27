import { parseParametersToArray } from '~features/filters/utils/parseParameters';

export const buildFilterQueryParameters = (subcategory: string, category: string, conditions: string) => {
  const filters: string[] = [];

  const allCategories = [...parseParametersToArray(category), ...parseParametersToArray(subcategory)];
  const allConditions = parseParametersToArray(conditions);

  if (allCategories.length > 0) {
    filters.push(`categories.id:${allCategories.map((id) => `"${id}"`).join(',')}`);
  }
  if (allConditions.length > 0) {
    filters.push(`variants.attributes.condition.label:${allConditions.map((id) => `"${id}"`).join(',')}`);
  }

  return filters.length > 0 ? { filter: filters } : {};
};
