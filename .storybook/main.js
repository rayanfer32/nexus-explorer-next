const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-theme-toggle',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  presets: ['@storybook/preset-scss'],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      assets: path.resolve(__dirname, '../src/assets'),
      components: path.resolve(__dirname, '../src/components'),
      contexts: path.resolve(__dirname, '../src/contexts'),
      hooks: path.resolve(__dirname, '../src/hooks'),
      pages: path.resolve(__dirname, '../src/pages'),
      styles: path.resolve(__dirname, '../src/styles'),
      types: path.resolve(__dirname, '../src/types'),
      utils: path.resolve(__dirname, '../src/utils'),
    };

    return config;
  },
};
