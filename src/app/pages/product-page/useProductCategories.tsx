import { useEffect, useState } from 'react';

import { DEFAULT_STORE_LANGUAGE } from '~/features/fetch-products/config/constants';
import { fetchCategories } from '~/features/fetch-products/utils/fetchCategories';

const ERRORS = {
  FETCH_CATEGORIES: 'Failed to fetch categories',
} as const;

export const useProductCategories = (productCategories: { id: string }[]) => {
  const [categoryNames, setCategoryNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        setIsLoading(true);
        const categories = await fetchCategories();
        const productCategoriesId = new Set(productCategories.map((category) => category.id));

        const names = categories
          .filter((category) => productCategoriesId.has(category.id))
          .sort((a, b) => Number(b.orderHint) - Number(a.orderHint))
          .map((category) => category.name[DEFAULT_STORE_LANGUAGE]);

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
