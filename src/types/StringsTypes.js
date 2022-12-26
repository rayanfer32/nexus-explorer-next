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
    total: { label: 'Total Registers', icon: <AiOutlineCodeSandbox /> },
    namespaces: {
      label: 'Namespace Registers',
      icon: <AiOutlineCodeSandbox />,
    },

    names: {
      global: {
        label: 'Global Name Registers',
        icon: <AiOutlineCodeSandbox />,
      },
      local: {
        label: 'Local Name Registers',
        icon: <AiOutlineCodeSandbox />,
      },
      namespaced: {
        label: 'Namespaced Name Registers',
        icon: <AiOutlineCodeSandbox />,
      },
    },
    objects: {
      accounts: { label: 'Account Registers', icon: <MdSupervisorAccount /> },
      assets: { label: 'Asset Registers', icon: <AiOutlineCodeSandbox /> },
      crypto: { label: 'Crypto Registers', icon: <AiOutlineCodeSandbox /> },
      tokenized: {
        label: 'Tokenized Object Registers',
        icon: <AiOutlineCodeSandbox />,
      },
      tokens: { label: 'Token Registers', icon: <AiOutlineCodeSandbox /> },
    },
    state: {
      raw: { label: 'Raw Registers', icon: <AiOutlineCodeSandbox /> },
      readonly: {
        label: 'Read-Only Registers',
        icon: <AiOutlineCodeSandbox />,
      },
    },
  },

  sigchains: {
    label: 'Signature Chains',
    sublabel: 'Users',
    icon: <BiUser />,
  },
  supply: {
    total: { label: 'Total Supply' },
    target: {},
    inflation: {
      label: 'Inflation Rate',
      sublabel: 'Annual',
      ticker: '%',
      icon: <AiOutlineStock />,
    },
    minute: { label: 'Per Minute', ticker: 'NXS' },
    hour: { label: 'Hourly', ticker: 'NXS' },
    day: { label: 'Daily', ticker: 'NXS' },
    week: { label: 'Weekly', ticker: 'NXS' },
    month: { label: 'Monthly', ticker: 'NXS' },
  },
  trust: {
    //! staked precentage calculated on Metrics page
    staked_percentage: {
      label: 'Staked Percentage',
      ticker: '%',
      icon: <BiLock />,
    },
    total: { label: 'Staking Accounts', icon: <FaUserLock /> },
    stake: { label: 'Total Staked', ticker: 'NXS', icon: <BiLock /> },
    trust: { label: 'Trust score', icon: <AiOutlineCodeSandbox /> },
  },
  reserves: {
    ambassador: { ticker: 'NXS' },
    developer: { ticker: 'NXS' },
    fee: { ticker: 'NXS' },
    hash: { ticker: 'NXS' },
    prime: { ticker: 'NXS' },
  },
};
