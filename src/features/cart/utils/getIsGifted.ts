import type { LineItem } from '@commercetools/platform-sdk';

export const getIsGifted = (item: LineItem) => item.lineItemMode === 'GiftLineItem';
