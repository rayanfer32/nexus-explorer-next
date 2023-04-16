import ASSESTS from 'assets';
import { NETWORKS } from './ConstantsTypes';

// removed id , used array index instead
const navList = [
  { title: 'Home', path: '/' },
  { title: 'Metrics', path: '/metrics' },
];

const navDropdowns = {
  Blockchain: [
    { title: 'Blocks', path: '/blocks' },
    { title: 'Transactions', path: '/transactions' },
  ],
  Statistics: [
    { title: 'Trustlist', path: '/trustlist' },
    { title: 'Richlist', path: '/richlist' },
  ],
  Registers: [
    { title: 'Global', path: '/globalnames' },
    { title: 'Namespaces', path: '/namespaces' },
    { title: 'Tokens', path: '/tokens' },
  ],
  DAO: [
    { title: 'Embassy', path: '/dao/embassy' },
    { title: 'Ambassador', path: '/dao/ambassador' },
    { title: 'Developer', path: '/dao/developer' },
  ],
};

export const OptionalNavbar = {
  OPTNAV: ['DAO'],
};

/// PROGRESS: REVAMP HEADER
export const navLinksNew = [
  { title: 'Home', path: '/' },
  { title: 'Metrics', path: '/metrics' },
  {
    title: 'Blockchain',
    path: '#',
    children: [
      { title: 'Blocks', path: '/blocks' },
      { title: 'Transactions', path: '/transactions' },
    ],
  },
  {
    title: 'Statistics',
    path: '#',
    children: [
      { title: 'Trustlist', path: '/trustlist' },
      { title: 'Richlist', path: '/richlist' },
    ],
  },
  {
    title: 'Registers',
    path: '#',
    children: [
      { title: 'Global', path: '/globalnames' },
      { title: 'Namespaces', path: '/namespaces' },
      { title: 'Tokens', path: '/tokens' },
    ],
  },
  {
    title: 'DAO',
    path: '#',
    children: [
      { title: 'Embassy', path: '/dao/embassy' },
      { title: 'Ambassador', path: '/dao/ambassador' },
      { title: 'Developer', path: '/dao/developer' },
    ],
    disabledNets: [NETWORKS.TESTNET.name],
  },
];

export const NavbarTypes = {
  NAVBAR: {
    NAVLIST: [...navList],
    NAVDROPDOWN: navDropdowns,
    BRAND: ASSESTS.BRAND.PRIMARY,
    NEW_NAVLIST: navLinksNew,
  },
};
