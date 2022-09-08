/**
 * Debounce function to avoid multiple calls
 * @param {Function} cb - The function to be debounced
 * @param {number} delay - The time to wait before calling cb
 * @example debounce(() => { console.log('debounced') }, 1000)
 */
let timeout;
export function debounce(cb, delay = 1000) {
  clearTimeout(timeout);
  timeout = setTimeout(cb, delay);
}
