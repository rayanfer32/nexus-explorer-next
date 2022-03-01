/* eslint-disable no-console */

import TYPES from 'types';
import { isDev } from './middleware';

/**
 * Log to console if in dev
 */
const Logger = (function () {
  const _env = isDev ? '__DEV__' : '__PROD__';
  const _style =
    'font-weight:800; padding: 0.2rem 0.4rem; border-radius: 0.25rem; margin-right: 0.5rem;';
  const _infoStyle = `color: ${TYPES.COLORS.OCEAN_BLUE}; background: ${TYPES.COLORS.SKY_BLUE}; ${_style}`;
  const _warnStyle = `color: #806600; background: ${TYPES.COLORS.MARKET_YELLOW}; ${_style}`;
  const _errorStyle = `color: ${TYPES.COLORS.MARKET_RED}; background: #ffb3b3; ${_style}`;

  return {
    log: function () {
      const args = Array.prototype.slice.call(arguments);
      isDev && console.log.apply(console, [`%c${_env}`, _infoStyle, ...args]);
    },

    warn: function () {
      const args = Array.prototype.slice.call(arguments);
      isDev && console.warn.apply(console, [`%c${_env}`, _warnStyle, ...args]);
    },

    error: function () {
      const args = Array.prototype.slice.call(arguments);
      isDev &&
        console.error.apply(console, [`%c${_env}`, _errorStyle, ...args]);
    },
  };
})();

export default Logger;
export const Log = Logger.log;
export const Warn = Logger.warn;
export const Error = Logger.error;
