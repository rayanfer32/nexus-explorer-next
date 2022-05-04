import { useAppContext } from 'contexts/AppContext';
import { useEffect, useState } from 'react';
import TYPES from 'types';
import { useMediaQuery } from '../useMediaQuery/useMediaQuery';

/**
 * if true enable the dark mode
 * @returns [boolean, callback]
 */
export function useDarkMode() {
  const { appContext: sharedState, setAppContext: setState } = useAppContext();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(() => {
    if (sharedState.theme == null) {
      return prefersDarkMode;
    } else {
      return sharedState.theme === TYPES.THEME.DARK;
    }
  });

  const setGlobalDarkMode = (enabled) => {
    setState('theme', enabled ? TYPES.THEME.DARK : TYPES.THEME.LIGHT);
    document.body.classList.toggle(TYPES.THEME.DARK, enabled);
  };

  useEffect(() => {
    setGlobalDarkMode(darkMode);
  }, [darkMode]);

  return [darkMode, setDarkMode];
}
