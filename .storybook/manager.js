import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';
import theme from './theme';

addons.setConfig({
  docs: {
    theme: themes.dark,
  },
  sidebar: {
    showRoots: true,
  },
  theme,
});
