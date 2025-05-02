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
      stdout.write(`Вы ввели: ${input}\n`);
      rl.prompt();
  }
  writeMessage(`\nYou are currently in ${cwd()}\n`, "red");
}
