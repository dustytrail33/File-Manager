import { writeMessage } from "./writeMessage.js";

/**
 * check args length
 * @param {object} param
 * @param {string[]} param.args
 * @param {number} param.length
 * @returns {boolean}
 */

export const checkArgsLength = ({ args, length }) => {
  if (
    args?.length > length ||
    args?.length < length
  ) {
    writeMessage({
      message: `Invalid input: Please enter only ${length} arguments`,
      color: "red",
    });
    return false;
  }

  return true;
};
