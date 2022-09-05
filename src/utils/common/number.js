import { Log, Warn } from 'utils/customLog';

/**
 * Get fixed number of digits in the number
 * @param {*} num number either float or int
 * @param {*} maxLen max number of digits to return
 * @returns
 */
export function toFixedDigit(num, maxLen = 6) {
  if (!Number.isInteger(Number(maxLen))) {
    Warn('toFixedDigit', num);
    return num;
  }

  // TODO: Handle exceptions
  const numLen = String(num).split('.');
  if (numLen[0].length >= maxLen) {
    return Number.parseFloat(num).toFixed(1);
  }
  const _mNum = Number.parseFloat(num).toFixed(
    Number(maxLen) - Number(numLen[0].length)
  );
  Log('toFixedDigit', _mNum);
  return Number(_mNum);
}
