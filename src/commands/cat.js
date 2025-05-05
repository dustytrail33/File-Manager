import { createReadStream } from "fs";
import { pipeline } from "stream";
import { promisify } from "util";

import { writeMessage } from "../utils/writeMessage.js";
import { checkArgsLength } from "../utils/checkArgsLength.js";
import { getAbsolutePath } from "../utils/getAbsolutePath.js";

const { stdout } = process;

/**
 *
 * @param {string[]} args
 */

const MIN_ARGS_LENGTH = 1;

export const cat = async (args) => {
  if (!checkArgsLength({ args, length: MIN_ARGS_LENGTH })) return;

  const targetPath = args.join(" ").trim();
  const filePath = getAbsolutePath(targetPath);
  try {
    const readStream = createReadStream(filePath, { encoding: "utf-8" });

    const asyncPipeline = promisify(pipeline);

    writeMessage({ message: "-".repeat(30), color: "yellow" });

    const readCallback = async (data) => {
      for await (const chunk of data) {
        stdout.write(chunk);
      }
    };

    await asyncPipeline(readStream, readCallback);
  } catch (error) {
    if (error.code === "ENOENT") {
      writeMessage({ message: "File not found", color: "red" });
    } else {
      writeMessage({ message: "Error reading file", color: "red" });
    }
  }
};
