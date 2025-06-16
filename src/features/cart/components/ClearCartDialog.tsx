import type { Cart } from '@commercetools/platform-sdk';

import { Button } from '~components/ui/button/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from '~components/ui/dialog/dialog';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { normalizeError } from '~/utils/normalizeError';

import { clearCart } from '../utils/clearCart';

type ClearCartDialogProps = {
  cart: Cart;
  onCartCleared: () => void;
};

const TEXTS = {
  TITLE: 'Clear cart?',
  DESCRIPTION: 'Are you sure you want to clear your cart? This action cannot be undone.',
  CANCEL: 'Cancel',
  CLEAR: 'Clear',
  SUCCESS: 'Cart cleared successfully',
};

export const ClearCartDialog = ({ cart, onCartCleared }: ClearCartDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClearCart = async () => {
    try {
      await clearCart(cart);
      onCartCleared();
      toast.success(TEXTS.SUCCESS);
      setIsDialogOpen(false);
    } catch (error: unknown) {
      toast.error(normalizeError(error).message);
    }
  };

  return (
    <>
      <Button
        variant="neutral"
        size="default"
        onClick={() => {
          setIsDialogOpen(true);
        }}
      >
        <Trash />
        {TEXTS.CLEAR}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogOverlay />
        <DialogContent hasCloseButton={false}>
          <DialogHeader>
            <DialogTitle>{TEXTS.TITLE}</DialogTitle>
            <DialogDescription>{TEXTS.DESCRIPTION}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="neutral"
              onClick={() => {
                setIsDialogOpen(false);
              }}
            >
              {TEXTS.CANCEL}
            </Button>
            <Button
              variant="default"
              onClick={() => {
                void handleClearCart();
              }}
            >
              {TEXTS.CLEAR}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
