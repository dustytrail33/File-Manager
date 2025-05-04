import { checkArgsLength } from "../utils/checkArgsLength.js";
import { writeMessage } from "../utils/writeMessage.js";
import { EOL, cpus, homedir, userInfo, arch } from "os";

/**
 *
 * @param {string[]} args
 */

const MIN_ARGS_LENGTH = 1;

export const os = async (args) => {
  if (!checkArgsLength({ args, length: MIN_ARGS_LENGTH })) return;
  const command = args.join(" ").trim();
  if (!command.startsWith("--")) {
    writeMessage({ message: "Invalid input: use --command", color: "red" });
  }

  switch (command) {
    case "--EOL":
      const eol = JSON.stringify(EOL);
      writeMessage({ message: `EOL ${eol}`, color: "green" });
      break;
    case "--cpus":
      writeMessage({ message: `Total CPUs: ${cpus().length}`, color: "green" });
      cpus().forEach((cpu, index) => {
        writeMessage({
          message: `CPU ${index + 1}: ${cpu.model}, ${
            Math.round((cpu.speed / 1000) * 100) / 100
          } GHz`,
          color: "green",
        });
      });
      break;
    case "--homedir": {
      writeMessage({
        message: `Home directory: ${homedir()}`,
        color: "green",
      });
      break;
    }

    case "--username": {
      writeMessage({
        message: `Username: ${userInfo().username}`,
        color: "green",
      });
      break;
    }

    case "--architecture": {
      writeMessage({
        message: `CPU architecture: ${arch()}`,
        color: "green",
      });
      break;
    }

    default:
      writeMessage({ message: "Invalid flag", color: "red" });
  }
};
