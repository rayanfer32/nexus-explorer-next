import { colors } from './colors';
import { FooterTypes } from './footer';
import { navbar } from './navbar';
import { Theme } from './theme';

export const TYPES = {
  ...colors,
  ...FooterTypes,
  ...navbar,
  ...Theme,
};

export default TYPES;
