// frontend/src/shared/hooks/useLocalStorage.js
import { useState, useEffect, useCallback } from 'react';

/**
 * A useState-compatible hook whose value is persisted in localStorage.
 * Safe against SSR/private-browsing environments where localStorage may throw.
 */
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore write failures (private mode / quota)
    }
  }, [key, value]);

  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }, [key]);

  return [value, setValue, remove];
}
