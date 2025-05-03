import { getState } from "../state/state.js";
import { resolve } from "path";
import { writeMessage } from "../utils/writeMessage.js";
import { promises } from "fs";
import { checkArgsLength } from "../utils/checkArgsLength.js";

/**
 *
 * @param {string[]} args
 */

const MIN_ARGS_LENGTH = 2;

export const rn = async (args) => {
  if (!checkArgsLength({ args, length: MIN_ARGS_LENGTH })) return;

  const { currentDir } = getState();
  const [oldName, newName] = args;
  
  const oldPath = resolve(currentDir, oldName);
  const newPath = resolve(currentDir, newName);

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
