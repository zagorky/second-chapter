import type { ButtonHTMLAttributes } from 'react';

import { Button } from '~components/ui/button/button';
import { Pencil, Check, Undo2 } from 'lucide-react';

export const EditButton = ({ onClick, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button variant="neutral" className="sm:inline-flex" onClick={onClick} {...rest}>
      <Pencil className="size-4" />
      <span className="hidden sm:inline">Edit</span>
    </Button>
  );
};

export const SaveButton = ({ onClick, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button variant="default" className="sm:inline-flex" onClick={onClick} {...rest}>
      <Check className="size-4" />
      <span className="hidden sm:inline">Save</span>
    </Button>
  );
};

export const CancelButton = ({ onClick, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button variant="neutral" className="sm:inline-flex" onClick={onClick} {...rest}>
      <Undo2 className="size-4" />
      <span className="hidden sm:inline">Cancel</span>
    </Button>
  );
};
