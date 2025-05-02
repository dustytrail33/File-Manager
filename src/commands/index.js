import { getState } from "../state/state.js";
import { writeMessage } from "../utils/writeMessage.js";
import { exit } from "./exit.js";
import { up } from "./up.js";

export function handleCommand(input, rl) {
  const [cmd, ...args] = input.split(" ");

  switch (cmd) {
    case "up":
      up(args);
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
}
