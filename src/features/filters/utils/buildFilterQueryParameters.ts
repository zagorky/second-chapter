import { parseParametersToArray } from '~features/filters/utils/parseParameters';

export const buildFilterQueryParameters = (
  subcategory: string,
  category: string,
  conditions: string,
  isDiscount: string,
  price: string
) => {
  const filters: string[] = [];

  const allCategories = [...parseParametersToArray(category), ...parseParametersToArray(subcategory)];
  const allConditions = parseParametersToArray(conditions);

  if (allCategories.length > 0) {
    filters.push(`categories.id:${allCategories.map((id) => `"${id}"`).join(',')}`);
  }
  if (allConditions.length > 0) {
    filters.push(`variants.attributes.condition.label:${allConditions.map((id) => `"${id}"`).join(',')}`);
  }
  if (isDiscount) filters.push(`variants.prices.discounted.value.centAmount:range(1 to *)`);

  if (price) {
    const [minPrice, maxPrice] = price.split('-');

    filters.push(`variants.price.centAmount:range(${minPrice.toString()} to ${maxPrice.toString()})`);
  }

  return filters.length > 0 ? { filter: filters } : {};
};
