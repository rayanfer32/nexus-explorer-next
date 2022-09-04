/**
 * This function is prepared to test whether object is blank (null or undefined)
 * @param {*} obj - object to be tested
 * @returns true if object is null or undefined, false otherwise
 */
export const isNullOrUndefined = obj => {
  return obj === undefined || obj === null;
};

/**
 * This function is prepared to withdraw data from object with null/undefined safety
 * for example: `this.aaa.bbb.ccc` will look like this -> `pathOr(0, ["bbb", "ccc"], this.aaa);`
 * @param {*} object - object from which we want to withdraw data
 * @param {*} defaltValue - default value which should be returned if one of the objects on the path will be blank
 * @param {*} _path - nesting
 * @returns object under path or passed default value if some object on the path is blank
 */
export const pathOr = (defaltValue, _path, object) => {
  if (isNullOrUndefined(object)) {
    return defaltValue;
  }
  let obj = object;
  for (const next of _path) {
    obj = obj[next];
    if (isNullOrUndefined(obj)) {
      return defaltValue;
    }
  }
  return obj;
};

/**
 * Builder pathOr function which creates predicate function with preconfigured data
 * @param {*} defaultValue - default return value
 * @param {*} _path - path to property
 * @returns function which has prepared predicate to use inside forEach, map etc.
 */
export const pathOrFunctionBuilder = (defaultValue, _path) => obj =>
  pathOr(defaultValue, _path, obj);

/**
 * Function for getting safety property or return undefined
 * @param {*} _path - path to property
 * @param {*} object - object where we are looking for property value
 * @returns found value in property tree or undefined
 */
export const path = (_path, object) => {
  if (isNullOrUndefined(object)) {
    return object;
  }
  const copiedPath = [..._path];
  let obj = object;
  for (const next of copiedPath) {
    obj = obj[next];
    if (isNullOrUndefined(obj)) {
      break;
    }
  }
  return obj;
};

/**
 * Builder path function which creates function with preconfigured predicate
 * @param {*} _path - path to property
 * @returns function which has prepared predicate to use inside forEach, map etc.
 */
export const pathFunctionBuilder = _path => obj => path(_path, obj);

/**
 * The same as pathOr but with different name (to be comply with ramda utility functions)
 * @param {*} defaltValue
 * @param {*} _path
 * @param {*} object
 * @returns
 */
export const propOr = pathOr;

/**
 * Function which checks equality of given value and property from object
 * @param {*} _path - path to property
 * @param {*} value - value to check
 * @param {*} object object where we are looking for property
 * @returns equality check result of property and given value
 */
export const pathEq = (_path, value, object) => path(_path, object) === value;

/**
 * Builder function which prepares predicate function for property equality checks
 * @param {*} name - property name
 * @param {*} val - given value for equality check
 * @returns predicate function
 */
export const propEq = (_path, val) => {
  const pathToTest = Array.isArray(_path) ? [..._path] : [_path];
  return obj => pathOr(undefined, pathToTest, obj) === val;
};

/**
 * Function finding element in collection which matches given predicate
 * @param {*} predicate - predicate function to check
 * @param {*} collection - collection where we are looking for element
 * @returns found element or undefined
 */
export const find = (predicate, collection) => collection.find(predicate);

/**
 * Function filtering collection by given predicate
 * @param {*} predicate - predicate function to check
 * @param {*} collection - collection where we are looking for element
 * @returns filtered collection
 */
export const filter = (predicate, collection) => collection.filter(predicate);

/**
 * Function which replaces value in collection with given new value
 * @param {*} index - index of element where to put new value
 * @param {*} newValue - new value
 * @param {*} collection - collection which we are updating
 * @returns
 */
export const update = (index, newValue, collection) => {
  const newArr = [...collection];
  newArr[index] = newValue;
  return newArr;
};

/**
 * Function which checks for equality*/
export const equals = (a, b) => a === b;

export const groupBy = func => arr => {
  const result = {};
  arr.forEach(elem => {
    const group = func(elem);
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(elem);
  });
  return result;
};

export const pipe = (...functions) => {
  return function(_val) {
    let val = _val;
    functions.forEach(fn => (val = fn(val)));
    return val;
  };
};
