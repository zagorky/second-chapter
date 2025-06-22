export type DiscountCodeConfigType = {
  code: string;
  conditions: string;
  color: {
    background: string;
    foreground: string;
  };
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
