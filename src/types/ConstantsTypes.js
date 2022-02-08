const REFETCH_INTERVALS = {
  MINING: 1000 * 60, // 1 minute
  METRICS: 1000 * 60,
  MARKET: 1000 * 60,
  INFO: 1000 * 30, // 30 sec
  REGENERATE_SSG: 1000 * 60, // 60 sec
};

const MAX_SUPPLY = 72586439.41;

export const ConstantsTypes = {
  REFETCH_INTERVALS,
  MAX_SUPPLY: {
    VALUE: MAX_SUPPLY,
  },
};
