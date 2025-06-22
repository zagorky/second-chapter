import type { Cart, DiscountCodeInfo } from '@commercetools/platform-sdk';
import type { DiscountCodeConfigType } from '~features/discount-codes/types/DiscountCodeConfigType';

import { Button } from '~components/ui/button/button';
import { DEFAULT_STORE_LANGUAGE } from '~config/constants';
import { useCart } from '~features/cart/hooks/useCart';
import { useDiscountCodeById } from '~features/discount-codes/hooks/useDiscountCodeById';
import { removeDiscountCode } from '~features/discount-codes/utils/removeDiscountCode';
import { normalizeError } from '~utils/normalizeError';
import { CircleCheck, X, Info } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Spinner } from '~/components/ui/spinner/spinner';

type DiscountCodeItemProps = {
  code: DiscountCodeInfo;
  cart: Cart;
  getDiscountCodeInfo: (id: string) => DiscountCodeConfigType;
  getDiscountStatusMessage: (state: string) => string;
};

const TEXTS = {
  REMOVE_BUTTON_SR_ONLY: 'Remove discount code',
  REMOVE_SUCCESS: 'Discount code removed successfully',
  REMOVE_ERROR: 'Failed to remove discount code',
};

export const DiscountCodeItem = ({
  code,
  cart,
  getDiscountCodeInfo,
  getDiscountStatusMessage,
}: DiscountCodeItemProps) => {
  const { refresh } = useCart();
  const [isRemoving, setIsRemoving] = useState(false);

  const { discountCode: fullDiscountCode, isLoading } = useDiscountCodeById(code.discountCode.id);

  const handleRemove = async () => {
    if (isRemoving) return;

    try {
      setIsRemoving(true);
      await removeDiscountCode({ cart, discountCodeId: code.discountCode.id });
      await refresh();
      toast.success(TEXTS.REMOVE_SUCCESS);
    } catch (error: unknown) {
      toast.error(`${TEXTS.REMOVE_ERROR}: ${normalizeError(error).message}`);
    } finally {
      setIsRemoving(false);
    }
  };

  const description = fullDiscountCode?.description?.[DEFAULT_STORE_LANGUAGE] ?? '';
  const { conditions } = getDiscountCodeInfo(fullDiscountCode?.code ?? '');
  const statusMessage = getDiscountStatusMessage(code.state);
  const isSuccessfullyApplied = code.state === 'MatchesCart';
  const isMatching = code.state === 'DoesNotMatchCart';

  return (
    <li
      key={code.discountCode.id}
      className="rounded-base border-border bg-background flex items-start justify-between gap-6 border p-4"
    >
      <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_auto] items-start gap-4 text-left">
        <div className="col-start-2 row-start-1 text-sm font-bold uppercase">
          {isLoading ? <Spinner size="sm" /> : <span> {description}</span>}
        </div>
        <div className="col-start-1 row-start-2">
          {isSuccessfullyApplied ? <CircleCheck className="h-6 w-6" /> : <Info className="h-6 w-6" />}
        </div>
        <div className="col-start-2 row-start-2">
          {statusMessage}
          {isMatching && <div> {conditions}</div>}
        </div>
      </div>
      <Button
        variant="neutral"
        size="icon"
        className="min-w-[40px]"
        onClick={() => {
          void handleRemove();
        }}
        disabled={isRemoving}
      >
        <X />
        <div className="sr-only">{TEXTS.REMOVE_BUTTON_SR_ONLY}</div>
      </Button>
    </li>
  );
};
