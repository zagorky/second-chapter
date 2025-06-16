export type DiscountCodeConfig = {
  id: string;
  code: string;
  title: string;
  description: string;
  conditions: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
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
