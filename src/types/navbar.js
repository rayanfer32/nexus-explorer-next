import ASSESTS from 'assets';

const navList = [
  { id: 1, title: 'Home', path: '/' },
  { id: 2, title: 'Trustlist', path: '/trustlist' },
  { id: 3, title: 'Richlist', path: '/richlist' },
  { id: 4, title: 'Global', path: '/globalnames' },
  { id: 6, title: 'Namespaces', path: '/namespaces' },
  { id: 7, title: 'Tokens', path: '/tokens' },
  // { id: 5, title: 'About', path: '/about' }, // moved to footer
];

export const Navbar = {
  NAVBAR: {
    NAVLIST: [...navList],
    BRAND: ASSESTS.BRAND.PRIMARY,
  },
};
