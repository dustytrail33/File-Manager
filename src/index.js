import { exit } from "./commands/exit.js";
import { handleCommand } from "./commands/index.js";
import { parseArgs } from "./utils/parseArgs.js";
import readline from "readline";
import { writeMessage } from "./utils/writeMessage.js";

const rootDir = import.meta.dirname;
const { stdout, argv } = process;

const flags = parseArgs(argv);
const username = flags.username;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "enter your command -->",
});

writeMessage(`Welcome to the File Manager, ${username}!\n`, "green");
rl.prompt();

rl.on("line", (line) => {
  const input = line.trim();
  handleCommand(input, username, rl);
});

rl.on("SIGINT", () => {
  stdout.write("\n");
  exit(username);
});
