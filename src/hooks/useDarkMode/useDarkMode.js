import { useEffect } from 'react';
import TYPES from 'types';
import { useMediaQuery } from '../useMediaQuery/useMediaQuery';
import { useLocalStorage } from '../useStorage/useStorage';

export function useDarkMode() {
  const [darkMode, setDarkMode] = useLocalStorage('theme');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const enabled = darkMode ?? prefersDarkMode;

  useEffect(() => {
    document.body.classList.toggle(TYPES.theme.dark, enabled);
  }, [enabled]);

  return [enabled, setDarkMode];
}
