import { useAppContext } from "contexts/AppContext";

export function useNetwork(){
  const { appContext, setAppContext } = useAppContext();

  return appContext.network;
}