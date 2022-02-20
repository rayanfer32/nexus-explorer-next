import { BiLock, BiUser } from 'react-icons/bi';
import { BsFilePerson } from 'react-icons/bs';
import { GrPersonalComputer } from 'react-icons/gr';
import { ColorsTypes } from './ColorsTypes';

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

export const METRICS_META = {
  registers: {
    account: { label: 'Account Registers' },
    append: { label: 'Append Registers' },
    crypto: { label: 'Crypto Registers' },
    name: { label: 'Total Name Registers' },
    name_global: { label: 'Global Name Registers' },
    name_namespaced: { label: 'Namespaced Name Registers' },
    namespace: { label: 'Namespace Registers' },
    object: { label: 'Non-Standard Object Registers' },
    object_tokenized: { label: 'Tokenized Object Registers' },
    raw: { label: 'Raw Registers' },
    readonly: { label: 'Read-Only Registers' },
    token: { label: 'Token Registers' },
    total: { label: 'Total Registers' },
  },
  reserves: {
    ambassador: {},
    developer: {},
    fee: {},
    hash: {},
    prime: {},
  },
  sig_chains: {
    label: 'Signature Chains',
    sublabel: 'Users',
    icon: <BiUser />,
  },
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
    staked_percentage: {
      label: 'Staked Percentage',
      ticker: '%',
      icon: <BiLock />,
    },
    stake: { label: 'Staked', ticker: 'NXS', icon: <BiLock /> },
    total: { label: 'Staking Accounts', icon: <BsFilePerson /> },
    trust: { label: 'Trust score' },
  },
};
