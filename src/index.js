// import { handleInit } from "./commands/init.js";

import { exit } from "./commands/exit.js";
import { parseArgs } from "./utils/parseArgs.js";
import readline from "readline";

const rootDir = import.meta.dirname;
const { stdin, stdout, argv } = process;

const flags = parseArgs(argv);
const userName = flags.username;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "enter the command -->",
});

console.log(`Welcome to the File Manager, ${userName}!`);
rl.prompt();

rl.on("line", (line) => {
  const input = line.trim();

  if (input === ".exit") {
    exit(userName);
  } else {
    console.log(`Вы ввели: ${input}`);
    rl.prompt();
  }
});

rl.on("SIGINT", () => {
  console.log("\n");
  exit(userName);
});
