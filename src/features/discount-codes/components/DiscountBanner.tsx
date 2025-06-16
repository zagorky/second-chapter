import type { DiscountCodeConfig } from '~features/discount-codes/types/DiscountCodeConfig';

import { Copy } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '~/lib/utilities';

type DiscountBannerProps = {
  discount: DiscountCodeConfig;
};

export const DiscountBanner = ({ discount }: DiscountBannerProps) => {
  const getDiscountText = () => {
    if (!discount.discount) return 'Unknown';

    if (discount.discount.type === 'relative') {
      return `${String(discount.discount.percentage)}%`;
    }

    return 'Gift';
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(discount.code);
    toast.success(`Code ${discount.code} copied to clipboard`);
  };

  return (
    <div className="text-main-foreground relative grid min-h-50 w-full grid-cols-[100px_auto] gap-2 overflow-hidden">
      <div
        className={cn(
          "before:border-border border-border rounded-base before:bg-secondary-background relative flex items-center justify-center border-2 p-0 pl-6 text-right before:absolute before:top-3 before:bottom-3 before:left-[-2px] before:w-4 before:rounded-r-full before:border-2 before:border-l-0 before:content-['']",
          'bg-chart-4'
        )}
      >
        <div className="text-center text-2xl font-bold [writing-mode:sideways-lr]">{getDiscountText()}</div>
      </div>
      <div className={cn('border-border rounded-base flex border-2 p-5', 'bg-chart-4')}>
        <div
          className={cn(
            'border-border rounded-base flex flex-grow flex-col items-start gap-4 border-2 p-3',
            'bg-chart-5'
          )}
        >
          <button
            onClick={() => void copyToClipboard()}
            className="group text-bg-main-foreground border-border flex items-center gap-2 rounded border-2 border-dotted bg-transparent px-4 py-2 text-left text-2xl font-bold uppercase transition-opacity hover:cursor-pointer hover:opacity-80 active:opacity-50"
          >
            <span>{discount.code}</span>

            {<Copy className="self-start transition group-hover:scale-130" size={16} />}
          </button>
          <p className="text-md max-w-[70%] self-start text-left opacity-90">{discount.description}</p>
        </div>
      </div>
    </div>
  );
};
