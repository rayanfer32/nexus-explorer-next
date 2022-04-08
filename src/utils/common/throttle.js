/**
 * Throttle a function to only be called once every wait milliseconds (defaults to 100ms)
 * @param {Function} func - The function to be throttled
 * @param {number} limit - The time to wait before calling func
 * @example throttle(() => { console.log('throttled') }, 100)
 */
export const throttle = (func, limit = 100) => {
  let lastFunc;
  let lastRan;

  return function () {
    const context = this;
    const args = arguments;

    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};
