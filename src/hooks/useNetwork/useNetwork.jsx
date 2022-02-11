import axios from 'axios';
import { useAppContext } from 'contexts/AppContext';

export function useNetwork() {
  const { appContext, setAppContext } = useAppContext();

  const url = appContext.network.url;

  function getMetrics() {
    return axios.get(
      `${
        appContext.network.url || process.env.NEXT_PUBLIC_NEXUS_BASE_URL
      }/system/get/metrics`
    );
  }

  function getInfo() {
    return axios.get(
      `${
        appContext.network.url || process.env.NEXT_PUBLIC_NEXUS_BASE_URL
      }/system/get/info`
    );
  }

  function getMining() {
    return axios.get(
      `${
        appContext.network.url || process.env.NEXT_PUBLIC_NEXUS_BASE_URL
      }/ledger/get/info`
    );
  }

  async function getRecentBlocks(MAX_ROWS = 6) {
    const res = await axios.get(
      `${
        appContext.network.url || process.env.NEXT_PUBLIC_NEXUS_BASE_URL
      }/ledger/list/blocks?verbose=summary&limit=${MAX_ROWS}`
    );
    return res.data.result;
  }

  const getTrustlist = async () => {
    const res = await axios.get(
      `${url || process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/register/list/trust`,
      {
        params: {
          // limit: 100,
          sort: 'trust',
          order: 'desc',
        },
      }
    );
    return res.data;
  };

  const getRichlist = async () => {
    // * to consider the users who have moved their balance to trust
    // * query for both trust and normal accounts
    const page0 = await axios.get(
      `${
        url || process.env.NEXT_PUBLIC_NEXUS_BASE_URL
      }/register/list/trust,accounts?page=0&sort=total&order=desc&limit=111`
    );

    return { data: [...page0.data.result] };
  };

  const getGlobalNames = async () => {
    const res = await fetch(
      `${url || process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/register/list/names`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          where: 'object.namespace=*GLOBAL*',
          limit: 100,
          page: 0,
        }),
      }
    );
    return res.json();
  };

  const getNamespaces = () => {
    return axios.get(
      `${
        url || process.env.NEXT_PUBLIC_NEXUS_BASE_URL
      }/register/list/namespaces`
    );
  };

  const getTokens = () => {
    return axios.get(
      `${
        url || process.env.NEXT_PUBLIC_NEXUS_BASE_URL
      }/register/list/tokens?sort=maxsupply`
    );
  };

  const getBlocks = async ({ queryKey }) => {
    const res = await axios.get(
      `${url}/ledger/list/blocks?limit=${queryKey[1]}&page=${queryKey[2]}`
    );
    return res.data.result;
  };

  const getTransactions = ({ queryKey }) =>
    axios.get(
      `${url}/ledger/list/blocks?verbose=summary&page=${queryKey[1]}&limit=${queryKey[2]}`
    );

  return {
    network: appContext.network,
    getMetrics,
    getInfo,
    getMining,
    getRecentBlocks,
    getTrustlist,
    getRichlist,
    getGlobalNames,
    getNamespaces,
    getTokens,
    getBlocks,
    getTransactions,
  };
}
