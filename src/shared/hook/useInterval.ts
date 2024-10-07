import { useEffect, useRef } from 'react';

import { usePreservedCallback } from './usePreserveCallback';

export const useInterval = (
  callback: () => void,
  delay?: number,
  enabled = true,
) => {
  const tick = usePreservedCallback(callback);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (!enabled) {
      clearTimeout(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => tick(), delay);
    return () => clearInterval(timerRef.current);
  }, [tick, enabled, delay]);
};
