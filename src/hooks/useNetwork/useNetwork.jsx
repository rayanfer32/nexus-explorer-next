import axios from 'axios';
import { useAppContext } from 'contexts/AppContext';
import { NETWORKS } from 'types/ConstantsTypes';

export function useNetwork() {
  const { appContext } = useAppContext();

  /* try to avoid use of the netwrok url from app context */
  const url =
    appContext.network.name === NETWORKS.MAINNET.name
      ? process.env.NEXT_PUBLIC_NEXUS_BASE_URL
      : process.env.NEXT_PUBLIC_TESTNET_BASE_URL;

  function getMetrics() {
    return axios.get(`${url}/system/get/metrics`, {
      headers: { 'Cache-Control': 'max-age=300' },
    });
  }

  function getInfo() {
    return axios.get(`${url}/system/get/info`);
  }

  function getMining() {
    return axios.get(`${url}/ledger/get/info`);
  }

  async function getRecentBlocks(MAX_ROWS = 6) {
    const res = await axios.get(
      `${url}/ledger/list/blocks?verbose=summary&limit=${MAX_ROWS}`
    );
    return res.data.result;
  }

  const getTrustlist = async () => {
    const res = await axios.get(`${url}/register/list/trust`, {
      headers: { 'Cache-Control': 'max-age=300' },
      params: {
        // limit: 100,
        sort: 'trust',
        order: 'desc',
      },
    });
    return res.data;
  };

  const getRichlist = async () => {
    // * to consider the users who have moved their balance to trust
    // * query for both trust and normal accounts
    const page0 = await axios.get(
      `${url}/register/list/trust,accounts?page=0&sort=total&order=desc&limit=111&where=object.token=0`,
      { headers: { 'Cache-Control': 'max-age=300' } }
    );

    return { data: [...page0.data.result] };
  };

  const getGlobalNames = async () => {
    const res = await fetch(`${url}/register/list/names`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=300',
      },
      body: JSON.stringify({
        where: 'object.namespace=*GLOBAL*',
        limit: 1000,
        page: 0,
      }),
    });
    return res.json();
  };

  const getNamespaces = () => {
    return axios.get(`${url}/register/list/namespaces?limit=1000`, {
      headers: { 'Cache-Control': 'max-age=300' },
    });
  };

  const getTokens = () => {
    return axios.get(`${url}/register/list/tokens?sort=maxsupply&limit=1000`, {
      headers: { 'Cache-Control': 'max-age=300' },
    });
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

  const getScanResults = async (endpoint, params) => {
    const res = await axios.get(`${url}/${endpoint}`, {
      params: params,
    });
    return res.data;
  };

  const getTrustTransactions = async (data) => {
    const res = await axios.get(`${url}/finance/transactions/trust`, {
      params: {
        address: data?.address,
        limit: 100,
      },
    });
    return res.data;
  };

  const getAccountTransactions = async (data) => {
    const res = await axios.get(`${url}/finance/transactions/account`, {
      params: {
        address: data?.address,
        limit: 100,
      },
    });
    return res.data;
  };

  return {
    network: { name: appContext.network.name, url },
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
    getScanResults,
    getTrustTransactions,
    getAccountTransactions,
  };
}
