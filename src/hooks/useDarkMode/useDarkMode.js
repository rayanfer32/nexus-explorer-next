import { useAppContext } from 'contexts/AppContext';
import { useEffect } from 'react';
import TYPES from 'types';
import { useMediaQuery } from '../useMediaQuery/useMediaQuery';
import { useLocalStorage } from '../useStorage/useStorage';

/**
 * if true enable the dark mode
 * @returns [boolean, callback]
 */
export function useDarkMode() {
  const [darkMode, setDarkMode] = useLocalStorage('theme');
  const { sharedState, setSharedState } = useAppContext();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const enabled = darkMode ?? prefersDarkMode;

  useEffect(() => {
    setSharedState({
      ...sharedState,
      theme: enabled ? TYPES.theme.dark : TYPES.theme.light,
    });
    document.body.classList.toggle(TYPES.theme.dark, enabled);
  }, [enabled]);

  return [enabled, setDarkMode];
}
