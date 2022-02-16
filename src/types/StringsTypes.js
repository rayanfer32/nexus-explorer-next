export const StringsTypes = {
  LOADER: {
    CIRCLE: 'circle',
    DOT: 'dot',
  },
  TEXT: {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
  },
  CHANNELS: { 0: 'Stake', 1: 'Prime', 2: 'Hash' },
  SHIMMER: {
    DEFAULT: 'default',
    TEXT: 'small-card',
  },
  PLACE_HOLDER: {
    SEARCH: 'Search for a username:account / block / transaction / address',
  },
};

export const metricsMeta = {
  registers: {
    account: {},
    append: {},
    crypto: {},
    name: {},
    name_global: {},
    name_namespaced: {},
    namespace: {},
    object: {},
    object_tokenized: {},
    raw: {},
    readonly: {},
    token: {},
    total: {},
  },
  reserves: {
    ambassador: {},
    developer: {},
    fee: {},
    hash: {},
    prime: {},
  },
  sig_chains: { label: 'Signature Chains', sublabel: 'Users' },
  supply: {
    day: { ticker: 'NXS' },
    hour: { ticker: 'NXS' },
    inflationrate: { label: 'Inflation Rate', sublabel: 'Annual', ticker: '%' },
    minute: { ticker: 'NXS' },
    month: { ticker: 'NXS' },
    target: {},
    total: {},
    week: { ticker: 'NXS' },
  },
  trust: {
    stake: { label: 'Staked', ticker: 'NXS' },
    total: { sublabel: 'Accounts' },
    trust: {},
  },
};
