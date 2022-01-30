import { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

/**
 * @constant Object Initial state of App
 */
const _state = {
  theme: 'dark',
};

export function ContextWrapper({ children }) {
  // not required imo
  const [sharedState, setSharedState] = useState(_state);

  return (
    <AppContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
