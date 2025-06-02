import { useEffect, useState } from 'react';

import { fetchCategory } from '~/features/category/utils/fetchCategory';
import { DEFAULT_STORE_LANGUAGE } from '~/features/fetch-products/config/constants';

const ERRORS = {
  FETCH_CATEGORIES: 'Failed to fetch categories',
} as const;

export type CategoryLink = {
  name: string;
  categoryId: string;
  parentId?: string;
};

export const useProductCategories = (productCategories: { id: string }[]) => {
  const [categoryNames, setCategoryNames] = useState<CategoryLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        setIsLoading(true);
        const categories = await fetchCategory({});
        const productCategoriesId = new Set(productCategories.map((category) => category.id));

        const names = categories
          .filter((category) => productCategoriesId.has(category.id))
          .sort((a, b) => Number(b.orderHint) - Number(a.orderHint))
          .map((category) => ({
            name: category.name[DEFAULT_STORE_LANGUAGE],
            categoryId: category.id,
            parentId: category.parent?.id,
          }));

        setCategoryNames(names);
      } catch (error) {
        console.error(ERRORS.FETCH_CATEGORIES, error);
        setCategoryNames([]);
      } finally {
        setIsLoading(false);
      }
    };

    void getCategories();
  }, [productCategories]);

  return { categoryNames, isLoading };
};
