import { writeMessage } from "../utils/writeMessage.js";
import { exit } from "./exit.js";
const { stdout, cwd } = process;

export function handleCommand(input, username, rl) {
  switch (input) {
    case ".exit":
      exit(username);
      rl.close();
      break;
    default:
      writeMessage({ message: "Invalid command.", color: "red" });
      rl.prompt();
      return
  }
  writeMessage({
    message: `You are currently in ${cwd()}`,
    color: "green",
    withDashes: true,
  });
}
