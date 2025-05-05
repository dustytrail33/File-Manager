import { isAbsolute, dirname, resolve } from "path";
import { writeMessage } from "../utils/writeMessage.js";
import { promises } from "fs";
import { checkArgsLength } from "../utils/checkArgsLength.js";
import { getAbsolutePath } from "../utils/getAbsolutePath.js";

/**
 *
 * @param {string[]} args
 */

const MIN_ARGS_LENGTH = 2;

export const rn = async (args) => {
  if (!checkArgsLength({ args, length: MIN_ARGS_LENGTH })) return;

  const [oldName, newName] = args;

  let oldPath;
  let newPath;

  if (isAbsolute(oldName)) {
    oldPath = getAbsolutePath(oldName);
    const dirOfOldFile = dirname(oldPath);
    newPath = resolve(dirOfOldFile, newName);
  } else {
    oldPath = getAbsolutePath(oldName);
    newPath = getAbsolutePath(newName);
  }

  try {
    await promises.rename(oldPath, newPath);
    writeMessage({
      message: `Renamed ${oldName} to ${newName}`,
      color: "green",
    });
  } catch (error) {
    if (error.code === "ENOENT") {
      writeMessage({
        message: `${oldName} not exists`,
        color: "red",
      });
    } else {
      writeMessage({ message: "Error rename", color: "red" });
    }
  }
};
