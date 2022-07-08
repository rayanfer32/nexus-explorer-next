import ASSESTS from 'assets';

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
    { title: 'Ambassador DAO', path: '/dao/ambassador' },
    { title: 'Developer DAO', path: '/dao/developer' },
  ],
  Registers: [
    { title: 'Global', path: '/globalnames' },
    { title: 'Namespaces', path: '/namespaces' },
    { title: 'Tokens', path: '/tokens' },
  ],
};

export const NavbarTypes = {
  NAVBAR: {
    NAVLIST: [...navList],
    NAVDROPDOWN: navDropdowns,
    BRAND: ASSESTS.BRAND.PRIMARY,
  },
};
