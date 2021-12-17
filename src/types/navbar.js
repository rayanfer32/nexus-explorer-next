import ASSESTS from 'assets';

const navList = [
  { id: 1, title: 'Home', path: '/' },
  { id: 2, title: 'Trustlist', path: '/trustlist' },
  { id: 3, title: 'Richlist', path: '/richlist' },
  { id: 4, title: 'Network', path: '/network' },
  { id: 5, title: 'About', path: '/about' },
];

export const navbar = {
  navbar: {
    NAVLIST:
      process.env.NODE_ENV == 'development'
        ? [...navList, { id: 6, title: 'Test', path: '/test' }]
        : [...navList],
    brand: ASSESTS.BRAND.PRIMARY,
  },
};
