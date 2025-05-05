import { writeMessage } from "../utils/writeMessage.js";
import { promises } from "fs";
import { checkArgsLength } from "../utils/checkArgsLength.js";
import { getAbsolutePath } from "../utils/getAbsolutePath.js";

/**
 *
 * @param {string[]} args
 */

const MIN_ARGS_LENGTH = 1;

export const mkdir = async (args) => {
  if (!checkArgsLength({ args, length: MIN_ARGS_LENGTH })) return;

  const dirName = args.join(" ").trim();
  const dirPath = getAbsolutePath(dirName);

  try {
    await promises.mkdir(dirPath, { recursive: false });
    writeMessage({
      message: `Directory ${dirName} created`,
      color: "green",
    });
  } catch (error) {
    if (error.code === "EEXIST") {
      writeMessage({
        message: `Directory ${dirName} already exists`,
        color: "red",
      });
    } else {
      writeMessage({ message: "Error creating directory", color: "red" });
    }
  }
};
