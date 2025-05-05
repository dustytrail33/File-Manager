/**
 * @param {string} str
 * @param {number} length
 * @returns {string}
 */

export const truncateString = (str, length) => {
  if (str.length <= length) return str;
  return str.slice(0, length - 3) + "...";
};
