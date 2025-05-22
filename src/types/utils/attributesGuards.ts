import type { Attribute } from '@commercetools/platform-sdk';

export const isStringAttribute = (attribute?: Attribute): attribute is Omit<Attribute, 'value'> & { value: string } =>
  typeof attribute?.value === 'string';

export const isLabelAttribute = (
  attribute?: Attribute
): attribute is Omit<Attribute, 'value'> & { value: { label: string } } =>
  !!attribute?.value && typeof attribute.value === 'object' && 'label' in attribute.value;
