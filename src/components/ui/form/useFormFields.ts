import { assertIsNonNullable } from '~utils/helpers';
import * as React from 'react';
import { type FieldPath, type FieldValues, useFormContext, useFormState } from 'react-hook-form';

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

type FormItemContextValue = {
  id: string;
};

const formItemContextDefaultValue: FormItemContextValue = { id: '<<unknown>>' };

const formFieldContextDefaultValue: FormFieldContextValue = { name: '<<unknown>>' };

export const FormFieldContext = React.createContext<FormFieldContextValue>(formFieldContextDefaultValue);

export const FormItemContext = React.createContext<FormItemContextValue>(formItemContextDefaultValue);

export const useFormField = () => {
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
