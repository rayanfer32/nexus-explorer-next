import { ButtonTypes } from './button';
import { colors } from './colors';
import { FooterTypes } from './footer';
import { Links } from './links';
import { navbar } from './navbar';
import { Strings } from './strings';
import { Theme } from './theme';
import { ToastmessageTypes } from './toastMessage';

export const TYPES = {
  ...colors,
  ...ButtonTypes,
  ...FooterTypes,
  ...Links,
  ...navbar,
  ...Strings,
  ...Theme,
  ...ToastmessageTypes,
};

export default TYPES;
