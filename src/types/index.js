import { ButtonTypes } from './button';
import { colors } from './colors';
import { FooterTypes } from './footer';
import { navbar } from './navbar';
import { Strings } from './strings';
import { Theme } from './theme';

export const TYPES = {
  ...colors,
  ...ButtonTypes,
  ...FooterTypes,
  ...navbar,
  ...Strings,
  ...Theme,
};

export default TYPES;
