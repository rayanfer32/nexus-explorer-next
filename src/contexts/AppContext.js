import { useLocalStorage } from 'hooks';
import { createContext, useContext } from 'react';
import { NETWORKS } from 'types/ConstantsTypes';

export const AppContext = createContext();

/**
 * @constant Object Initial state of App
 */
const _state = {
  theme: null,
  network: NETWORKS.MAINNET,
};

export function ContextWrapper({ children }) {
  // sync the context with localStorage
  const [sharedState, setSharedState] = useLocalStorage('context', _state);

  /**
   * setState
   * @param {string} key
   * @param {any} data
   * @returns
   */
  const setAppContext = (key = undefined, data) => {
    if (key) {
      setSharedState((prev) => ({
        ...prev,
        [key]: data,
      }));
    }

    if (!key) {
      typeof data === 'object' &&
        !Array.isArray(data) &&
        setSharedState((prev) => ({
          ...prev,
          ...data,
        }));
    }

    return;
  };

  return (
    <AppContext.Provider
      // * soon sharedState and setSharedState will be removed
      // * recommand not to use sharedState and setSharedState
      value={{
        sharedState,
        setSharedState,
        appContext: sharedState,
        setAppContext,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
