import axios from 'axios';

export function fetchMetrics(url) {
  return axios.get(
    `${url || process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/system/get/metrics`,
    { headers: { 'Cache-Control': 'max-age=300' } }
  );
}

export function fetchInfo(url) {
  return axios.get(
    `${url || process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/system/get/info`
  );
}

export function fetchMining(url) {
  return axios.get(
    `${url || process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/ledger/get/info`
  );
}

export function fetchMarket() {
  return axios.get(`${process.env.NEXT_PUBLIC_COINGECKO_BASE_URL}/coins/nexus`);
}

export async function fetchRecentBlocks(MAX_ROWS = 6) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/ledger/list/blocks?verbose=summary&limit=${MAX_ROWS}`
  );
  return res.data.result;
}
