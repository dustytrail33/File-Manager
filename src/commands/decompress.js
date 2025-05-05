import { resolve, basename, isAbsolute } from "path";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { createBrotliDecompress } from "zlib";

import { getState } from "../state/state.js";
import { checkArgsLength } from "../utils/checkArgsLength.js";
import { writeMessage } from "../utils/writeMessage.js";
import { getAbsolutePath } from "../utils/getAbsolutePath.js";

/**
 *
 * @param {string[]} args
 */

const MIN_ARGS_LENGTH = 2;

export const decompress = async (args) => {
  if (!checkArgsLength({ args, length: MIN_ARGS_LENGTH })) return;

  const { currentDir } = getState();
  const [targetName, targetDir] = args;

  const targetFilePath = getAbsolutePath(targetName);
  const targetDecompressPath = isAbsolute(targetDir)
    ? resolve(targetDir, basename(targetName).replace(/\.br$/, ""))
    : resolve(currentDir, targetDir, basename(targetName).replace(/\.br$/, ""));

  try {
    const readStream = createReadStream(targetFilePath);
    const decompressedStream = createBrotliDecompress();
    const writeStream = createWriteStream(targetDecompressPath);

    await pipeline(readStream, decompressedStream, writeStream);

    writeMessage({
      message: `File ${targetName} decompressed to ${targetDecompressPath}`,
      color: "green",
    });
  } catch (error) {
    if (error.code === "ENOENT") {
      writeMessage({
        message: "File or directory does not exist",
        color: "red",
      });
    } else {
      writeMessage({ message: `Error decompress ${error.message}`, color: "red" });
    }
  }
};
