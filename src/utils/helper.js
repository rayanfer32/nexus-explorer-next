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

// https://rawcdn.githack.com/sitepoint-editors/clipboardapi/a8dfad6a1355bbb79381e61a2ae68394af144cc2/demotext.html
export function handleCopy(value) {
  // doesnt support copy on mobile yet
  if (navigator.clipboard) {
    navigator.clipboard.writeText(value);
  }
}

export function totalPages(totalRows, pageSize) {
  // * use floor instead of round as the api isnt flexible to handle last page where limit is more than the rows.
  return Math.floor(totalRows / pageSize);
}
