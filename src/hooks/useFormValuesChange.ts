import type { DeepPartial, FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { useCurrentValueReference } from '~hooks/useCurrentValueReference';
import { useEffect } from 'react';

export const useFormValuesChange = <TFieldValues extends FieldValues = FieldValues>(
  form: UseFormReturn<TFieldValues>,
  onFieldsChange: (fieldChangeInfo: { name?: Path<TFieldValues>; values: DeepPartial<TFieldValues> }) => void
) => {
  const { watch } = form;

  const savedFieldsChangeCallback = useCurrentValueReference(onFieldsChange);

  useEffect(() => {
    const subscription = watch((values, { name, type }) => {
      if (type === 'change') {
        savedFieldsChangeCallback.current({ name, values });
      }
    });

    return subscription.unsubscribe;
  }, [savedFieldsChangeCallback, watch]);
};
