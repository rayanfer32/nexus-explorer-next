/**
 *
 * @param {String} str
 */
export const toKebabCase = str => {
  // https://gist.github.com/thevangelist/8ff91bac947018c9f3bfaad6487fa149#gistcomment-2986430
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z0-9]*|\b)|[A-Z]?[a-z0-9]*|[A-Z]|[0-9]+/g)
    .filter(Boolean)
    .map(x => x.toLowerCase())
    .join("-");
};
