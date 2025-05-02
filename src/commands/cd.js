import path from "path";
import {promises} from 'fs'
import { getState, setCurrentDir } from "../state/state.js";
import { writeMessage } from "../utils/writeMessage.js";

/**
 *
 * @param {string[]} args
 */

const MIN_ARGS_LENGTH = 1;

export const cd = async (args) => {
  const { currentDir } = getState();

  if (args.length > MIN_ARGS_LENGTH || args.length === 0) {
    writeMessage({
      message: "Invalid input: Please enter only one folder path",
      color: "red",
    });
    return;
  }
  const targetPath = args.join(" ").trim();
  let newPath;

  if (path.isAbsolute(targetPath)) {
    newPath = targetPath;
  } else {
    newPath = path.resolve(currentDir, targetPath);
  }

  try {
    const stats = await promises.stat(newPath);
    if (!stats.isDirectory()) {
      writeMessage({ message: "Invalid input: not a directory", color: "red" });
      return;
    }

    setCurrentDir(newPath);
  } catch (err) {
    writeMessage({
      message: "Invalid input: path does not exist",
      color: "red",
    });
  }
};
