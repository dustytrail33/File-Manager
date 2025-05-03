import { getState } from "../state/state.js";
import { writeMessage } from "../utils/writeMessage.js";
import { exit } from "./exit.js";
import { up } from "./up.js";
import { ls } from "./ls.js";
import { cd } from "./cd.js";
import { cat } from "./cat.js";

export const handleCommand = async (input, rl) => {
  const [cmd, ...args] = input.split(" ");

  switch (cmd) {
    case "up":
      up();
      break;
    case "ls":
      await ls();
      break;
    case "cd":
      await cd(args);
      break;
    case "cat":
      await cat(args);
      break;
    case ".exit":
      exit();
      rl.close();
      break;
    default:
      writeMessage({ message: "Invalid input", color: "red" });
      rl.prompt();
      return;
  }

  const { currentDir } = getState();

  writeMessage({
    message: `You are currently in ${currentDir}`,
    color: "green",
    withDashes: true,
  });
  rl.prompt();
};
