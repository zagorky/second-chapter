import { useCallback, useEffect, useRef } from 'react';

export const useTimeout = (callback: (...parameters: unknown[]) => unknown, delay: number) => {
  const callbackReference = useRef(callback);
  const timeoutReference = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    callbackReference.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutReference.current = setTimeout(() => callbackReference.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    if (timeoutReference.current) {
      clearTimeout(timeoutReference.current);
    }
  }, []);

  useEffect(() => {
    set();

    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
};
