import { useLayoutEffect, useRef } from 'react';

export function useCurrentValueReference<TValue>(value: TValue) {
  const valueReference = useRef(value);

  useLayoutEffect(() => {
    valueReference.current = value;
  });

  return valueReference;
}
