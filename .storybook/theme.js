import { create } from '@storybook/theming';
import NexusLogo from '../src/assets/branding/NexusLogoBlue1250x225.png';

export default create({
  base: 'dark',
  // UI
  appBg: '#012235',
  // Toolbar default and active colors
  barBg: '#e3f6ff',
  // Brand
  brandTitle: 'Nexus Explorer',
  brandUrl: 'https://explorer.nexus.io/',
  brandImage: NexusLogo,
});
