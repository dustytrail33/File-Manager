import { getState } from "../state/state.js";
import { writeMessage } from "../utils/writeMessage.js";
import { exit } from "./exit.js";
import { up } from "./up.js";
import { ls } from "./ls.js";
import { cd } from "./cd.js";
import { cat } from "./cat.js";
import { add } from "./add.js";
import { mkdir } from "./mkdir.js";
import { rn } from "./rn.js";
import { cp } from "./cp.js";
import { mv } from "./mv.js";
import { rm } from "./rm.js";
import { os } from "./os.js";
import { hash } from "./hash.js";

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
    case "add":
      await add(args);
      break;
    case "mkdir":
      await mkdir(args);
      break;
    case "rn":
      await rn(args);
      break;
    case "cp":
      await cp(args);
      break;
    case "mv":
      await mv(args);
      break;
    case "rm":
      await rm(args);
      break;
    case "os":
      await os(args);
      break;
    case ".exit":
      exit();
      rl.close();
      break;
    case "hash":
      await hash(args);
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
