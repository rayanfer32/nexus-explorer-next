/**
 * ObjectMap
 * @param {*} obj Object to be mapped
 * @param {*} fn mapping funtion
 * @returns new object with the values at each key mapped using mapFn(value)
 */
export const ObjectMap = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));

/**
 *
 * @param {*} obj
 * @returns
 */
export const ObjectMapf = (obj) => (fn) =>
  Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));
