const path = require('path');

const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    fallbacks: {
      image: ['/wifi-strike.svg','/NexusLogoBlue1000x225.png', '/NexusLogoBlue1000x225.png'],
    },
    disable: process.env.NODE_ENV === 'development',
  }
})
