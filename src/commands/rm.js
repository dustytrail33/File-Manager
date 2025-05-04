import { checkArgsLength } from "../utils/checkArgsLength.js";
import { getState } from "../state/state.js";
import { resolve } from "path";
import { writeMessage } from "../utils/writeMessage.js";
import { promises } from "fs";

/**
 *
 * @param {string[]} args
 */

const MIN_ARGS_LENGTH = 1;

export const rm = async (args) => {
  if (!checkArgsLength({ args, length: MIN_ARGS_LENGTH })) return;

  const { currentDir } = getState();
  const targetName = args.join(" ").trim();

  const targetPath = resolve(currentDir, targetName);

  try {
    await promises.unlink(targetPath);
    writeMessage({ message: `File deleted: ${targetName}`, color: "green" });
  } catch (error) {
    if (error.code === "ENOENT") {
      writeMessage({
        message: "File not found",
        color: "red",
      });
    } else {
      writeMessage({ message: `Error delete ${error.message}`, color: "red" });
    }
  }
};
