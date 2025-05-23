import type { Attribute } from '@commercetools/platform-sdk';

export const isStringAttribute = (attribute?: Attribute): attribute is Omit<Attribute, 'value'> & { value: string } =>
  typeof attribute?.value === 'string';

export const isLabelAttribute = (
  attribute?: Attribute
): attribute is Omit<Attribute, 'value'> & { value: { label: string } } =>
  !!attribute?.value && typeof attribute.value === 'object' && 'label' in attribute.value;

export const getStringAttribute = (attributes: Attribute[] | undefined, key: string): string => {
  const attribute = attributes?.find((attribute_) => attribute_.name === key);

  return isStringAttribute(attribute) ? attribute.value : 'Unknown';
};

export const getLabelAttribute = (attributes: Attribute[] | undefined, key: string): string => {
  const attribute = attributes?.find((attribute_) => attribute_.name === key);

  if (isLabelAttribute(attribute)) {
    return attribute.value.label;
  }

  return 'Unknown';
};
