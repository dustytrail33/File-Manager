import { resolve, basename, isAbsolute } from "path";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { createBrotliCompress } from "zlib";

import { getState } from "../state/state.js";
import { checkArgsLength } from "../utils/checkArgsLength.js";
import { writeMessage } from "../utils/writeMessage.js";
import { getAbsolutePath } from "../utils/getAbsolutePath.js";

/**
 *
 * @param {string[]} args
 */

const MIN_ARGS_LENGTH = 2;

export const compress = async (args) => {
  if (!checkArgsLength({ args, length: MIN_ARGS_LENGTH })) return;

  const { currentDir } = getState();
  const [targetName, targetDir] = args;

  const targetFilePath = getAbsolutePath(targetName);
  const targetCompressPath = isAbsolute(targetDir)
    ? resolve(targetDir, basename(targetName) + ".br")
    : resolve(currentDir, targetDir, basename(targetName) + ".br");

  try {
    const readStream = createReadStream(targetFilePath);
    const compressedStream = createBrotliCompress();
    const writeStream = createWriteStream(targetCompressPath);

    await pipeline(readStream, compressedStream, writeStream);

    writeMessage({
      message: `File ${targetName} compressed to ${targetCompressPath}`,
      color: "green",
    });
  } catch (error) {
    if (error.code === "ENOENT") {
      writeMessage({
        message: "File or directory does not exist",
        color: "red",
      });
    } else {
      writeMessage({ message: "Error compress", color: "red" });
    }
  }
};
