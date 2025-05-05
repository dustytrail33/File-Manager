import { getState } from "../state/state.js";
import { resolve, isAbsolute, basename } from "path";
import { writeMessage } from "../utils/writeMessage.js";
import { promises, createReadStream, createWriteStream, constants } from "fs";
import { checkArgsLength } from "../utils/checkArgsLength.js";
import { promisify } from "util";
import { pipeline } from "stream";
import { getAbsolutePath } from "../utils/getAbsolutePath.js";

/**
 *
 * @param {string[]} args
 */

const MIN_ARGS_LENGTH = 2;

export const cp = async (args) => {
  if (!checkArgsLength({ args, length: MIN_ARGS_LENGTH })) return;

  const { currentDir } = getState();
  const [fileName, targetDir] = args;

  const filePath = getAbsolutePath(fileName);
  const targetPath = isAbsolute(targetDir)
    ? resolve(targetDir, basename(fileName))
    : resolve(currentDir, targetDir, basename(fileName));

  try {
    await promises.access(filePath, constants.F_OK);

    const stats = await promises.stat(resolve(currentDir, targetDir));
    if (!stats.isDirectory()) {
      writeMessage({
        message: `Target ${targetDir} is not a directory`,
        color: "red",
      });
      return;
    }

    const readStream = createReadStream(filePath);
    const writeStream = createWriteStream(targetPath);

    const asyncPipeline = promisify(pipeline);

    await asyncPipeline(readStream, writeStream);

    writeMessage({
      message: `File ${fileName} copied successfully`,
      color: "green",
    });
  } catch (error) {
    if (error.code === "ENOENT") {
      writeMessage({
        message: "File or directory does not exist",
        color: "red",
      });
    } else {
      writeMessage({ message: `Error copy ${error.message}`, color: "red" });
    }
  }
};
