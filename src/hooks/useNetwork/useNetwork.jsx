import axios from "axios";
import { useAppContext } from "contexts/AppContext";

export function useNetwork(){
  const { appContext, setAppContext } = useAppContext();

  function getMetrics() {
    return axios.get(
      `${appContext.network.url || process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/system/get/metrics`
    );
  }
  
  function getInfo() {
    return axios.get(
      `${appContext.network.url || process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/system/get/info`
    );
  }
  
  function getMining() {
    return axios.get(
      `${appContext.network.url || process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/ledger/get/info`
    );
  }

  async function getRecentBlocks(MAX_ROWS = 6){
    const res = await axios.get(
      `${appContext.network.url || process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/ledger/list/blocks?verbose=summary&limit=${MAX_ROWS}`
    );
    return res.data.result;
  }

  return {network: appContext.network, getMetrics, getInfo, getMining, getRecentBlocks};
}