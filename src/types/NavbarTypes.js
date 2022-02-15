import ASSESTS from 'assets';

// removed id , used array index instead
const navList = [
  { title: 'Home', path: '/' },
  { title: 'Trustlist', path: '/trustlist' },
  { title: 'Richlist', path: '/richlist' },
  { title: 'Metrics', path: '/metrics' },
  { title: 'Global', path: '/globalnames' },
  { title: 'Namespaces', path: '/namespaces' },
  { title: 'Tokens', path: '/tokens' },
];

export const NavbarTypes = {
  NAVBAR: {
    NAVLIST: [...navList],
    BRAND: ASSESTS.BRAND.PRIMARY,
  },
};
