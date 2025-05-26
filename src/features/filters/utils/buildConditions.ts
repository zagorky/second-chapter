import type { ProductProjection } from '@commercetools/platform-sdk';
import type { ConditionInfo } from '~features/filters/types/types';

import { getLabelAttribute } from '~types/utils/attributesGuards';

export const buildConditionsMap = (products: ProductProjection[]) => {
  const conditionMap = new Map<string, ConditionInfo>();

  products.forEach((product) => {
    const conditionLabel = getLabelAttribute(product.masterVariant.attributes, 'condition');
    const existingConditionLabel = conditionMap.get(conditionLabel);

    conditionMap.set(conditionLabel, {
      id: product.id,
      count: existingConditionLabel ? existingConditionLabel.count + 1 : 1,
    });
  });

  return conditionMap;
};

export const buildConditionsTree = (conditionsMap: Map<string, ConditionInfo>) => {
  return [...conditionsMap.entries()];
};
