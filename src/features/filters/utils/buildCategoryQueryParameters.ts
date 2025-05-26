export const buildCategoryQueryParameters = (subcategory: string, category?: string) => {
  if (!category && !subcategory) return {};
  if (category && subcategory) return { filter: [`categories.id:"${category}"`, `categories.id:"${subcategory}"`] };

  return { filter: [`categories.id:"${subcategory}"`] };
};
