import type { CategoryNode } from '~features/category/utils/buildCategories';

import { validateSortKey } from '~features/sort/utils/validateSortKey';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

type UseSetURLParameters = {
  page: number;
  search: string;
  conditions: string[];
  price: { priceRange: number[]; min: number; max: number };
  sale: boolean;
  category: CategoryNode;
  sort: string;
};

type URLParametersKeys = keyof UseSetURLParameters;
export const useSyncQueryParameters = () => {
  const [searchParameters, setSearchParameters] = useSearchParams();

  const updateURLParameters = useCallback(
    (parameters: Partial<UseSetURLParameters>) => {
      const newParameters = new URLSearchParams(searchParameters);

      if ('page' in parameters && parameters.page !== undefined) {
        newParameters.set('page', String(parameters.page));
      }

      if ('search' in parameters) {
        handleSearchParameter(newParameters, parameters.search);
      }

      if ('conditions' in parameters) {
        handleConditionsParameter(newParameters, parameters.conditions);
      }

      if ('sale' in parameters) {
        handleSaleParameter(newParameters, parameters.sale);
      }

      if ('price' in parameters) {
        handlePriceParameter(newParameters, parameters.price);
      }

      if ('category' in parameters) {
        handleCategoryParameter(newParameters, parameters.category);
      }

      if ('sort' in parameters) {
        handleSortParameter(newParameters, parameters.sort);
      }

      if (newParameters.toString() !== searchParameters.toString()) {
        setSearchParameters(newParameters);
      }
    },
    [searchParameters, setSearchParameters]
  );

  const removeURLParameters = useCallback(
    (parameters: URLParametersKeys[]) => {
      const newParameters = new URLSearchParams(searchParameters);

      parameters.forEach((parameter) => {
        handleRemoveParameter(newParameters, parameter);
      });

      if (newParameters.toString() !== searchParameters.toString()) {
        setSearchParameters(newParameters);
      }
    },
    [searchParameters, setSearchParameters]
  );

  return {
    updateURLParameters,
    removeURLParameters,
  };
};

function setPageToOne(parameters: URLSearchParams) {
  parameters.set('page', '1');
}

function handleSearchParameter(parameters: URLSearchParams, search?: string) {
  if (search && search.trim() !== '') {
    parameters.set('search', search);
  } else {
    parameters.delete('search');
  }
  setPageToOne(parameters);
}

function handleConditionsParameter(parameters: URLSearchParams, conditions?: string[]) {
  if (conditions && conditions.length > 0) {
    parameters.set('conditions', conditions.join(','));
  } else {
    parameters.delete('conditions');
  }
  setPageToOne(parameters);
}

function handleSaleParameter(parameters: URLSearchParams, sale?: boolean) {
  if (sale) {
    parameters.set('sale', 'true');
  } else {
    parameters.delete('sale');
  }
  setPageToOne(parameters);
}

function handlePriceParameter(parameters: URLSearchParams, price?: { priceRange: number[]; min: number; max: number }) {
  if (price && (price.priceRange[0] !== price.min || price.priceRange[1] !== price.max)) {
    parameters.set('price', price.priceRange.join('-'));
  } else {
    parameters.delete('price');
  }
  setPageToOne(parameters);
}

function handleCategoryParameter(parameters: URLSearchParams, category?: CategoryNode) {
  if (!category) {
    return;
  }

  if (category.parent === '') {
    parameters.set('category', category.id);
    parameters.delete('subcategory');
  } else {
    parameters.set('category', category.parent);
    parameters.set('subcategory', category.id);
  }
  setPageToOne(parameters);
}

function handleSortParameter(parameters: URLSearchParams, sort?: string) {
  if (!sort) {
    return;
  }

  if (sort === 'default') {
    parameters.delete('sort');
  } else {
    parameters.set('sort', validateSortKey(sort).shortKey);
  }

  setPageToOne(parameters);
}

function handleRemoveParameter(parameters: URLSearchParams, parameter: URLParametersKeys) {
  switch (parameter) {
    case 'page': {
      parameters.delete('page');
      break;
    }

    case 'search': {
      setPageToOne(parameters);
      parameters.delete('search');
      break;
    }

    case 'conditions': {
      setPageToOne(parameters);
      parameters.delete('conditions');
      break;
    }

    case 'price': {
      setPageToOne(parameters);
      parameters.delete('price');
      break;
    }

    case 'sale': {
      setPageToOne(parameters);
      parameters.delete('sale');
      break;
    }

    case 'category': {
      setPageToOne(parameters);
      parameters.delete('category');
      parameters.delete('subcategory');
      break;
    }

    case 'sort': {
      setPageToOne(parameters);
      parameters.delete('sort');
      break;
    }
  }
}
