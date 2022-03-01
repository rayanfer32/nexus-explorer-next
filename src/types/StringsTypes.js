import { AiOutlineCodeSandbox, AiOutlineStock } from 'react-icons/ai';
import { BiLock, BiUser } from 'react-icons/bi';
import { FaUserLock } from 'react-icons/fa';
import { MdSupervisorAccount } from 'react-icons/md';

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
    account: { label: 'Account Registers', icon: <MdSupervisorAccount /> },
    append: { label: 'Append Registers', icon: <AiOutlineCodeSandbox /> },
    crypto: { label: 'Crypto Registers', icon: <AiOutlineCodeSandbox /> },
    name: { label: 'Total Name Registers', icon: <AiOutlineCodeSandbox /> },
    name_global: {
      label: 'Global Name Registers',
      icon: <AiOutlineCodeSandbox />,
    },
    name_namespaced: {
      label: 'Namespaced Name Registers',
      icon: <AiOutlineCodeSandbox />,
    },
    namespace: { label: 'Namespace Registers', icon: <AiOutlineCodeSandbox /> },
    object: {
      label: 'Non-Standard Object Registers',
      icon: <AiOutlineCodeSandbox />,
    },
    object_tokenized: {
      label: 'Tokenized Object Registers',
      icon: <AiOutlineCodeSandbox />,
    },
    raw: { label: 'Raw Registers', icon: <AiOutlineCodeSandbox /> },
    readonly: { label: 'Read-Only Registers', icon: <AiOutlineCodeSandbox /> },
    token: { label: 'Token Registers', icon: <AiOutlineCodeSandbox /> },
    total: { label: 'Total Registers', icon: <AiOutlineCodeSandbox /> },
  },
  reserves: {
    ambassador: { ticker: 'NXS' },
    developer: { ticker: 'NXS' },
    fee: { ticker: 'NXS' },
    hash: { ticker: 'NXS' },
    prime: { ticker: 'NXS' },
  },
  sig_chains: {
    label: 'Signature Chains',
    sublabel: 'Users',
    icon: <BiUser />,
  },
  supply: {
    day: { label: 'Daily', ticker: 'NXS' },
    hour: { label: 'Hourly', ticker: 'NXS' },
    inflationrate: {
      label: 'Inflation Rate',
      sublabel: 'Annual',
      ticker: '%',
      icon: <AiOutlineStock />,
    },
    minute: { label: 'Per Minute', ticker: 'NXS' },
    month: { label: 'Monthly', ticker: 'NXS' },
    target: {},
    total: { label: 'Total Supply' },
    week: { label:"Weekly", ticker: 'NXS' },
  },
  trust: {
    staked_percentage: {
      label: 'Staked Percentage',
      ticker: '%',
      icon: <BiLock />,
    },
    stake: { label: 'Total Staked', ticker: 'NXS', icon: <BiLock /> },
    total: { label: 'Staking Accounts', icon: <FaUserLock /> },
    trust: { label: 'Trust score', icon: <AiOutlineCodeSandbox /> },
  },
};
