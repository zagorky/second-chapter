export type DiscountCodeConfig = {
  id: string;
  code: string;
  title: string;
  description: string;
  conditions: string;
  discount?:
    | {
        type: 'relative';
        items: 'all' | 'some';
        percentage: number;
      }
    | {
        type: 'gift-line-item';
      };
};
