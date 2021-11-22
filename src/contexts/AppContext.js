import { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export function ContextWrapper({ children }) {
  // not required imo
  const [sharedState, setSharedState] = useState({
    theme: 'dark',
  });

  // let sharedState = { theme: 'dark' };

  return (
    <AppContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
