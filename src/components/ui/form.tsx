import type * as LabelPrimitive from '@radix-ui/react-label';

import { Slot } from '@radix-ui/react-slot';
import { assertIsNonNullable } from '~utils/helpers';
import * as React from 'react';
import { useMemo } from 'react';
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { Label } from '~/components/ui/label';
import { cn } from '~/lib/utilities';

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const formFieldContextDefaultValue: FormFieldContextValue = { name: '<<unknown>>' };

const FormFieldContext = React.createContext<FormFieldContextValue>(formFieldContextDefaultValue);

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  const fieldContext = useMemo(() => ({ name: props.name }), [props.name]);

  return (
    <FormFieldContext value={fieldContext}>
      <Controller {...props} />
    </FormFieldContext>
  );
}

const useFormField = () => {
  const fieldContext = React.use(FormFieldContext);
  const itemContext = React.use(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  assertIsNonNullable(fieldContext, 'useFormField should be used within <FormField>');

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const formItemContextDefaultValue: FormItemContextValue = { id: '<<unknown>>' };

const FormItemContext = React.createContext<FormItemContextValue>(formItemContextDefaultValue);

function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  const id = React.useId();
  const contextValue = useMemo(() => ({ id }), [id]);

  return (
    <FormItemContext value={contextValue}>
      <div data-slot="form-item" className={cn('grid gap-2', className)} {...props} />
    </FormItemContext>
  );
}

function FormLabel({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn('font-heading', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId}
      aria-invalid={!!error}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn('font-base text-foreground text-sm', className)}
      {...props}
    />
  );
}

function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error.message ?? '') : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn('font-base text-sm text-red-500', className)}
      {...props}
    >
      {body}
    </p>
  );
}

export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField };
