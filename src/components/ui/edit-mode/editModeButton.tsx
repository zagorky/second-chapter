import type { ButtonHTMLAttributes } from 'react';

import { Button } from '~components/ui/button/button';
import { Pencil, Check, Undo2 } from 'lucide-react';

type SavingButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isSaving?: boolean;
};

const EDIT_MODE_TEXTS = {
  EDIT_BUTTON: 'Edit',
  CANCEL_BUTTON: 'Cancel',
  SAVE_BUTTON: 'Save',
  UPDATE_IN_PROGRESS: 'Saving...',
};

export const EditButton = ({ onClick, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button type="button" variant="default" className="sm:inline-flex" onClick={onClick} {...rest}>
      <Pencil className="size-4" />
      <span className="hidden sm:inline">{EDIT_MODE_TEXTS.EDIT_BUTTON}</span>
    </Button>
  );
};

export const SaveButton = ({ isSaving = false, ...rest }: SavingButtonProps) => {
  return (
    <Button type="submit" variant="default" className="sm:inline-flex" {...rest}>
      <Check className="size-4" />
      <span className="hidden sm:inline">
        {isSaving ? EDIT_MODE_TEXTS.UPDATE_IN_PROGRESS : EDIT_MODE_TEXTS.SAVE_BUTTON}
      </span>
    </Button>
  );
};

export const CancelButton = ({ onClick, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button type="button" variant="neutral" className="sm:inline-flex" onClick={onClick} {...rest}>
      <Undo2 className="size-4" />
      <span className="hidden sm:inline">{EDIT_MODE_TEXTS.CANCEL_BUTTON}</span>
    </Button>
  );
};
