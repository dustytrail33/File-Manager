import { promises } from "fs";
import { setCurrentDir } from "../state/state.js";
import { writeMessage } from "../utils/writeMessage.js";
import { checkArgsLength } from "../utils/checkArgsLength.js";
import { getAbsolutePath } from "../utils/getAbsolutePath.js";

/**
 *
 * @param {string[]} args
 */

const MIN_ARGS_LENGTH = 1;

export const cd = async (args) => {
  if (!checkArgsLength({ args, length: MIN_ARGS_LENGTH })) return;

  const targetPath = args.join(" ").trim();
  const newPath = getAbsolutePath(targetPath);

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
