import axios from 'axios';
import { useAppContext } from 'contexts/AppContext';
import { NETWORKS, API_URLS } from 'types/ConstantsTypes';
import { fetchRichlist } from 'utils/common/fetch';

export function useNetwork() {
  const { appContext } = useAppContext();

  const MAINNET_URL = process.env.NEXT_PUBLIC_NEXUS_BASE_URL;
  const TESTNET_URL = process.env.NEXT_PUBLIC_TESTNET_BASE_URL;
  const { MAINNET: MAINNET_PROXY_URL, TESTNET: TESTNET_PROXY_URL } = API_URLS;

  // * Change network url based on the NEXT_PUBLIC_USE_PROXY_MIDDLEWARE env variable
  const isProxyEnabled =
    process.env.NEXT_PUBLIC_USE_PROXY_MIDDLEWARE.toLowerCase() == 'true'
      ? true
      : false;
  const isMainnetSelected = appContext.network.name === NETWORKS.MAINNET.name;

  const url = isMainnetSelected
    ? isProxyEnabled
      ? MAINNET_PROXY_URL
      : MAINNET_URL
    : isProxyEnabled
    ? TESTNET_PROXY_URL
    : TESTNET_URL;

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

  function getLedgerMetrics() {
    return axios.get(`${url}/ledger/get/metrics`);
  }

  async function getRecentBlocks(MAX_ROWS = 6) {
    const res = await axios.get(
      `${url}/ledger/list/blocks?verbose=summary&limit=${MAX_ROWS}`
    );
    return res.data.result;
  }

  const getTrustlist = async ({ queryKey }) => {
    const res = await axios.get(`${url}/register/list/finance:trust`, {
      headers: { 'Cache-Control': 'max-age=300' },
      params: {
        page: queryKey[1],
        limit: queryKey[2],
        sort: 'trust',
        order: 'desc',
      },
    });
    return res.data;
  };

  const getRichlist = async (page = 0, limit = 111) => {
    return fetchRichlist(url, page, limit);
  };

  // ! fetch doesnt return rejected promise by default which is required by react-query to correctly handle error scenarios, hence use axios library th
  const getGlobalNames = async () => {
    const res = await axios(`${url}/register/list/names:global`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=300',
      },
      data: {
        limit: 1000,
        page: 0,
      },
    });
    return res.data;
  };

  const getNamespaces = () => {
    return axios.get(`${url}/register/list/names:namespaces?limit=1000`, {
      headers: { 'Cache-Control': 'max-age=300' },
    });
  };

  const getTokens = () => {
    return axios.get(
      `${url}/register/list/finance:tokens?sort=maxsupply&limit=1000`,
      {
        headers: { 'Cache-Control': 'max-age=300' },
      }
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

  // todo: need seperate api functions for the finance/get/account, finance/get/trust
  const getScanResults = async (endpoint, params) => {
    const res = await axios.get(`${url}/${endpoint}`, {
      params: params,
    });
    return res.data;
  };

  // todo: add suppprt for adresses also
  const getAccount = async (username) => {
    const res = await axios.get(
      `${url}/register/get/finance:account?name=${username}`
    );
    return res.data.result;
  };

  const getTrust = async (username) => {
    const res = await axios.get(
      `${url}/register/get/finance:trust?name=${username}`
    );
    return res.data.result;
  };

  const getTrustTransactions = async (address, page, limit) => {
    const res = await axios.get(`${url}/register/transactions/finance:trust`, {
      params: {
        address: address,
        page: page,
        limit: limit,
      },
    });
    return res.data;
  };

  const getAccountTransactions = async (address, page, limit) => {
    const res = await axios.get(
      `${url}/register/transactions/finance:account`,
      {
        params: {
          address: address,
          page: page,
          limit: limit,
        },
      }
    );
    return res.data;
  };

  const getInvoices = async (username, page, limit) => {
    // example command
    // ./nexus register/list/invoices:invoice limit=20 where='results.owner=username(`US:Interactions`);'

    const params = {
      limit,
      page,
      where: `results.owner=username(\`${username}\`);`,
    };

    const res = await axios.get(`${url}/register/list/invoices:invoice`, {
      headers: { 'Cache-Control': 'max-age=120' },
      params,
    });
    return res.data.result;
  };

  /**
   * Get Invoice info for a given address
   * @param {string} address
   * @returns {Promise}
   */
  const getInvoice = async (address) => {
    const res = await axios.get(
      `${url}/register/get/invoices:invoice?address=${address}`
    );
    return res.data.result;
  };

  return {
    network: { name: appContext.network.name, url },
    getInfo,
    getTrust,
    getBlocks,
    getTokens,
    getMining,
    getAccount,
    getInvoice,
    getMetrics,
    getRichlist,
    getInvoices,
    getTrustlist,
    getNamespaces,
    getScanResults,
    getGlobalNames,
    getRecentBlocks,
    getTransactions,
    getLedgerMetrics,
    getTrustTransactions,
    getAccountTransactions,
  };
}
