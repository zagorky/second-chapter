import type { CategoryNode } from '~features/category/utils/buildCategories';

import { useSearchParams } from 'react-router';

type useSetURLParameters = {
  page: number;
  search: string;
  conditions: string[];
  price: { priceRange: number[]; min: number; max: number };
  sale: boolean;
  category: CategoryNode;
};

type URLParametersKeys = keyof useSetURLParameters;
export const useSetUrl = () => {
  const [searchParameters, setSearchParameters] = useSearchParams();

  const updateURLParameters = (parameters: Partial<useSetURLParameters>) => {
    const newParameters = new URLSearchParams(searchParameters);

    if (
      parameters.search !== undefined ||
      parameters.conditions !== undefined ||
      parameters.price !== undefined ||
      parameters.sale !== undefined ||
      parameters.category !== undefined
    ) {
      newParameters.set('page', '1');
    }

    if (parameters.page !== undefined) {
      newParameters.set('page', String(parameters.page));
    }

    if (parameters.search !== undefined) {
      if (parameters.search.trim() === '') {
        newParameters.delete('search');
      } else {
        newParameters.set('search', parameters.search);
      }
    }

    if (parameters.conditions !== undefined && parameters.conditions.length > 0) {
      newParameters.set('conditions', parameters.conditions.join(','));
    } else {
      newParameters.delete('conditions');
    }

    if (parameters.sale) {
      newParameters.set('sale', 'true');
    } else {
      newParameters.delete('sale');
    }

    if (
      parameters.price &&
      (parameters.price.priceRange[0] !== parameters.price.min ||
        parameters.price.priceRange[1] !== parameters.price.max)
    ) {
      newParameters.set('price', parameters.price.priceRange.join('-'));
    } else {
      newParameters.delete('price');
    }

    if (parameters.category !== undefined) {
      if (parameters.category.parent === '') {
        newParameters.set('category', parameters.category.id);
        newParameters.delete('subcategory');
      } else {
        newParameters.set('category', parameters.category.parent);
        newParameters.set('subcategory', parameters.category.id);
      }
    }
    if (newParameters.toString() !== searchParameters.toString()) {
      setSearchParameters(newParameters);
    }
  };

  const removeURLParameters = (parameters: URLParametersKeys[]) => {
    const newParameters = new URLSearchParams(searchParameters);

    parameters.forEach((parameter) => {
      switch (parameter) {
        case 'page': {
          newParameters.delete('page');
          break;
        }

        case 'search': {
          newParameters.set('page', '1');
          newParameters.delete('search');
          break;
        }

        case 'conditions': {
          newParameters.set('page', '1');
          newParameters.delete('conditions');
          break;
        }

        case 'price': {
          newParameters.set('page', '1');
          newParameters.delete('price');
          break;
        }

        case 'sale': {
          newParameters.set('page', '1');
          newParameters.delete('sale');
          break;
        }

        case 'category': {
          newParameters.set('page', '1');
          newParameters.delete('category');
          newParameters.delete('subcategory');
          break;
        }
      }
    });

    if (newParameters.toString() !== searchParameters.toString()) {
      setSearchParameters(newParameters);
    }
  };

  return {
    updateURLParameters,
    removeURLParameters,
  };
};
