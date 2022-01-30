import { useCallback, useState, useEffect } from 'react';

export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const jsonValue =
      typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof defaultValue === 'function') {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (value === undefined) return window.localStorage.removeItem(key);
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  return [value, setValue, remove];
}

export function useSessionStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const jsonValue =
      typeof window !== 'undefined' ? window.sessionStorage.getItem(key) : null;
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof defaultValue === 'function') {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (value === undefined) return window.sessionStorage.removeItem(key);
      window.sessionStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  return [value, setValue, remove];
}
