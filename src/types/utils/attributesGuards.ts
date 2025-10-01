import type { Attribute } from '@commercetools/platform-sdk';

const isStringAttribute = (attribute?: Attribute): attribute is Omit<Attribute, 'value'> & { value: string } =>
  typeof attribute?.value === 'string';

const isEnumAttribute = (
  attribute?: Attribute
): attribute is Omit<Attribute, 'value'> & { value: { key: string; label: string } } =>
  !!attribute?.value && typeof attribute.value === 'object' && 'label' in attribute.value && 'key' in attribute.value;

export const getStringAttribute = (attributes: Attribute[] | undefined, key: string): string => {
  const attribute = attributes?.find((attribute_) => attribute_.name === key);

  return isStringAttribute(attribute) ? attribute.value : 'Unknown';
};

export const getEnumAttribute = (attributes: Attribute[] | undefined, key: string): { label: string; key: string } => {
  const attribute = attributes?.find((attribute_) => attribute_.name === key);

  if (isEnumAttribute(attribute)) {
    return {
      label: attribute.value.label,
      key: attribute.value.key,
    };
  }

  return { label: 'Unknown', key: 'Unknown' };
};
