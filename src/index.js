import { handleInit } from "./commands/init.js";

import { parseArgs } from "./utils/parseArgs.js";

const args = process.argv;
const command = args[0];
const flags = parseArgs(args)
console.log( flags )

switch (command) {
  case "init":
    handleInit(flags);
    break;
  case "help":
  case "--help":
  case "-h":
  case undefined:
    showHelp();
    break;
  default:
    console.log(`Unknown command: "${command}"`);
    showHelp();
}

