import { resolve } from "path";
import { createHash } from "crypto";
import { createReadStream } from "fs";
import { pipeline } from "stream/promises";

import { getState } from "../state/state.js";
import { checkArgsLength } from "../utils/checkArgsLength.js";
import { writeMessage } from "../utils/writeMessage.js";

/**
 *
 * @param {string[]} args
 */

const MIN_ARGS_LENGTH = 1;

export const hash = async (args) => {
  if (!checkArgsLength({ args, length: MIN_ARGS_LENGTH })) return;

  const { currentDir } = getState();
  const targetName = args.join(" ").trim();

  const targetPath = resolve(currentDir, targetName);

  const hash = createHash("sha256");

  try {
    const stream = createReadStream(targetPath);
    await pipeline(stream, hash);
    const digest = hash.digest("hex");
    writeMessage({ message: `Hash: ${digest}`, color: "green" });
  } catch (error) {
    if (error.code === "ENOENT") {
      writeMessage({
        message: "File not found",
        color: "red",
      });
    } else {
      writeMessage({ message: "Error hash", color: "red" });
    }
  }
};
