import { writeMessage } from "../utils/writeMessage.js";
import { promises } from "fs";
import { checkArgsLength } from "../utils/checkArgsLength.js";
import { getAbsolutePath } from "../utils/getAbsolutePath.js";

/**
 *
 * @param {string[]} args
 */

const MIN_ARGS_LENGTH = 1;

export const add = async (args) => {
  if (!checkArgsLength({ args, length: MIN_ARGS_LENGTH })) return;

  const fileName = args.join(" ").trim();
  const filePath = getAbsolutePath(fileName);

  try {
    await promises.writeFile(filePath, "", { flag: "wx" });
    writeMessage({
      message: `File ${fileName} created`,
      color: "green",
    });
  } catch (error) {
    if (error.code === "EEXIST") {
      writeMessage({
        message: `File ${fileName} already exists`,
        color: "red",
      });
    } else {
      writeMessage({ message: "Error creating file", color: "red" });
    }
  }
};
