import { isAbsolute, resolve } from "path";
import { getState } from "../state/state.js";

/**
 *
 * @param {string} path
 * @returns {string}
 */

export const getAbsolutePath = (path) => {
  const { currentDir } = getState();

  let newPath;

  if (isAbsolute(path)) {
    newPath = path;
  } else {
    newPath = resolve(currentDir, path);
  }

  return newPath;
};
