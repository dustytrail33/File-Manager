import readline from "readline";
import os from "os";
import { exit } from "./commands/exit.js";
import { handleCommand } from "./commands/index.js";
import { parseArgs } from "./utils/parseArgs.js";
import { writeMessage } from "./utils/writeMessage.js";
import { setCurrentDir, setUserName } from "./state/state.js";

const homeDir = os.homedir();
const flags = parseArgs(process.argv);
const username = flags.username || "unnamed";

setUserName(username);
setCurrentDir(homeDir);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "enter your command -->",
});

writeMessage({
  message: `Welcome to the File Manager, ${username}!\nYou are currently in ${homeDir}`,
  color: "green",
  withDashes: true,
});

rl.prompt();

rl.on("line", (line) => {
  const input = line.trim();
  handleCommand(input, rl);
});

rl.on("SIGINT", () => {
  exit();
});
