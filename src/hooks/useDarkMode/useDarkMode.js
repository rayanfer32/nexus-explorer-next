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

  const isDarkTheme = sharedState.theme === TYPES.theme.dark ? true : false;

  const setGlobalDarkMode = (enabled) => {
    setSharedState({
      ...sharedState,
      theme: enabled ? TYPES.theme.dark : TYPES.theme.light,
    });
    document.body.classList.toggle(TYPES.theme.dark, enabled);
    return (isDarkTheme) => isDarkTheme
  }

  useEffect(() => {
    setGlobalDarkMode(enabled)
  }, [enabled]);
  // * problem with the hook not updating state is
  // * this hook creates a new instance of the state inside the child component
  // * so the global theme state is not updated

  // * refer the theme state from the sharedState
  

  return [isDarkTheme, setDarkMode, setGlobalDarkMode];

  // * this will create state instances for each child component and
  // * hence does not update with the global theme state
  // return [enabled, setDarkMode];
}
