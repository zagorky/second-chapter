import type { DiscountCode } from '@commercetools/platform-sdk';

import { Copy } from 'lucide-react';
import { toast } from 'sonner';

import { DEFAULT_STORE_LANGUAGE } from '~/config/constants';
import { cn } from '~/lib/utilities';

import { getDiscountCodeInfo } from '../utils/getDiscountCodeInfo';

type DiscountBannerProps = {
  discount: DiscountCode;
};

export const DiscountBanner = ({ discount }: DiscountBannerProps) => {
  const description = discount.description?.[DEFAULT_STORE_LANGUAGE] ?? '';
  const code = discount.code;

  const discountConfig = getDiscountCodeInfo(code);

  const getDiscountText = () => {
    if (!discountConfig.discount) {
      return 'Unknown discount';
    }

    if (discountConfig.discount.type === 'relative') {
      return `${String(discountConfig.discount.percentage)}%`;
    }

    return 'Gift';
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    toast.success(`Code ${code} copied to clipboard`);
  };

  return (
    <div className="text-main-foreground relative grid min-h-60 w-full gap-2 overflow-hidden sm:grid-cols-[100px_auto]">
      <div
        className="before:border-border border-border rounded-base before:bg-secondary-background relative hidden items-center justify-center border-2 p-0 pl-6 text-right before:absolute before:top-3 before:bottom-3 before:left-[-3px] before:w-4 before:rounded-r-full before:border-2 before:border-l-0 before:content-[''] sm:flex"
        style={{
          backgroundColor: `var(${discountConfig.color.background})`,
        }}
      >
        <div
          className={cn(
            'text-border-foreground text-center text-4xl font-bold uppercase [text-shadow:3px_4px_0px_var(--color-border)] [writing-mode:sideways-lr]'
          )}
        >
          {getDiscountText()}
        </div>
      </div>
      <div
        className="border-border rounded-base relative flex border-2 p-5"
        style={{
          backgroundColor: `var(${discountConfig.color.background})`,
        }}
      >
        <div
          className="border-border rounded-base flex flex-grow flex-col items-start gap-4 border-2 p-3"
          style={{
            backgroundColor: `var(${discountConfig.color.foreground})`,
          }}
        >
          <button
            type="button"
            onClick={() => void copyToClipboard()}
            className="group text-bg-main-foreground border-border flex items-center gap-2 rounded border-2 border-dotted bg-transparent px-4 py-2 text-left text-xl font-bold uppercase transition-opacity hover:cursor-pointer hover:opacity-80 active:opacity-50"
          >
            <span>{code}</span>

            {<Copy className="self-start transition group-hover:scale-130" size={16} />}
          </button>
          <p className="text-md max-w-[70%] self-start text-left opacity-90">{description}</p>
          <img
            src={discountConfig.image.src}
            alt={code}
            className="absolute right-0 bottom-0 max-w-[clamp(120px,30%,200px)]"
            width={discountConfig.image.width}
            height={discountConfig.image.height}
          />
        </div>
      </div>
    </div>
  );
};
