import type { Cart } from '@commercetools/platform-sdk';

import { Button } from '~components/ui/button/button';
import { Input } from '~components/ui/input';
import { Label } from '~components/ui/label';
import { useCart } from '~features/cart/hooks/useCart';
import { applyDiscountCode } from '~features/discount-codes/utils/applyDiscountCode';
import { getDiscountStatusMessage } from '~features/discount-codes/utils/getDiscountStatusMessage';
import { normalizeError } from '~utils/normalizeError';
import { useState } from 'react';
import { toast } from 'sonner';

type DiscountCodeInputProps = {
  cart: Cart;
};

export const DiscountCodeInput = ({ cart }: DiscountCodeInputProps) => {
  const { refresh } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const id = 'discount-code';

  const TEXTS = {
    LABEL: 'Enter discount code',
    PLACEHOLDER: 'Got a discount code? Enter it here',
    BUTTON: 'Apply',
    SUCCESS: 'Discount code applied successfully',
    ERROR: 'Failed to apply discount code',
    EMPTY_CODE: 'Please enter a discount code',
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!discountCode.trim()) {
      toast.error(TEXTS.EMPTY_CODE);

      return;
    }

    if (isLoading) return;

    try {
      setIsLoading(true);
      const nextCart = await applyDiscountCode({ cart, discountCode: discountCode.trim() });

      if (nextCart.discountCodes.length > 0) {
        const lastDiscountCode = nextCart.discountCodes[nextCart.discountCodes.length - 1];

        if (lastDiscountCode.state === 'MatchesCart') {
          toast.success(TEXTS.SUCCESS);
          setDiscountCode('');
        } else {
          const errorMessage = getDiscountStatusMessage(lastDiscountCode.state);

          toast.error(errorMessage);
        }
      } else {
        toast.error('Could not apply code: No discount codes found');
      }

      await refresh();
    } catch (error: unknown) {
      toast.error(`${TEXTS.ERROR}: ${normalizeError(error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="uppercase"
      onSubmit={(event) => {
        void handleSubmit(event);
      }}
    >
      <Label htmlFor={id} className="mb-4 block text-left">
        {TEXTS.LABEL}
      </Label>
      <div className="flex gap-2">
        <Input
          id={id}
          type="text"
          placeholder={TEXTS.PLACEHOLDER}
          value={discountCode}
          onChange={(event) => {
            setDiscountCode(event.target.value);
          }}
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {TEXTS.BUTTON}
        </Button>
      </div>
    </form>
  );
};
