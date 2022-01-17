/**
 * ObjectMap
 * @param {*} obj Object to be mapped
 * @param {*} fn mapping funtion
 * @returns new object with the values at each key mapped using mapFn(value)
 */
export const ObjectMap = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));

/**
 * ObjectMapf
 * @param1 Object to be mapped
 * @param2 Mapping function
 * @returns new object with the values at each key mapped using mapFn(value)
 */
export const ObjectMapf = (obj) => (fn) =>
  Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));

/**
 * ObjectToArray
 * @param {*} obj Object to be converted
 * @returns Array of object values
 */
export const ObjectToArray = (obj) => Object.keys(obj).map((key) => obj[key]);

/**
 * ObjectToArrayWithKey
 * @param {*} obj
 * @returns Array of object key and value
 */
export const ObjectToArrayWithKey = (obj) =>
  Object.keys(obj).map((key) => [key, obj[key]]);
