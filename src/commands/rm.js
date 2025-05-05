import { checkArgsLength } from "../utils/checkArgsLength.js";
import { writeMessage } from "../utils/writeMessage.js";
import { promises } from "fs";
import { getAbsolutePath } from "../utils/getAbsolutePath.js";

/**
 *
 * @param {string[]} args
 */

const MIN_ARGS_LENGTH = 1;

export const rm = async (args) => {
  if (!checkArgsLength({ args, length: MIN_ARGS_LENGTH })) return;

  const targetName = args.join(" ").trim();

  const targetPath = getAbsolutePath(targetName);

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
      writeMessage({ message: "Error delete", color: "red" });
    }
  }
};
