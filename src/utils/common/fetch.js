import axios from 'axios';

export function fetchMetrics() {
  return axios.get(
    `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/system/get/metrics`
  );
}

export function fetchInfo() {
  return axios.get(`${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/system/get/info`);
}

export function fetchMining() {
  return axios.get(`${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/ledger/get/info`);
}

export function fetchMarket() {
  return axios.get(`${process.env.NEXT_PUBLIC_COINGECKO_BASE_URL}/coins/nexus`);
}
