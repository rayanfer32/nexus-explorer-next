const path = require('path');

const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  }
})
