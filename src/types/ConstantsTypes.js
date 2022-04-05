export const API_URLS = {
  MAINNET: '/api/v1/mainnet',
  TESTNET: '/api/v1/testnet',
};

export const REFETCH_INTERVALS = {
  MINING: 1000 * 60, // 1 minute
  METRICS: 1000 * 60,
  MARKET: 1000 * 60,
  INFO: 1000 * 30, // 30 sec
  REGENERATE_SSG_INTERVAL: 1000 * 60, // 60 sec
};

export const CARD_TYPES = {
  BLOCK: 'block',
  TRANSACTION: 'transaction',
  USER: 'user',
  TRUST: 'trust',
}

const MAX_SUPPLY = 72586439.41;

export const ConstantsTypes = {
  REFETCH_INTERVALS,
  MAX_SUPPLY: {
    VALUE: MAX_SUPPLY,
  },
};

export const NETWORKS = {
  //* AVOID ADDING NETWORKS url TO THIS LIST
  MAINNET: {
    name: 'Mainnet',
    // url: process.env.NEXT_PUBLIC_NEXUS_BASE_URL
  },
  TESTNET: {
    name: 'Testnet',
    // url: process.env.NEXT_PUBLIC_TESTNET_BASE_URL,
  },
};
