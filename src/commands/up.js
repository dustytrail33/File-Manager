import path from "path";
import { getState, setCurrentDir } from "../state/state.js";
import { writeMessage } from "../utils/writeMessage.js";

export const up = () => {
  const { currentDir } = getState();
  const parentDir = path.dirname(currentDir);

  if (parentDir === currentDir) {
    writeMessage({
      message: "You are already at the root directory",
      color: "red",
    });
    return;
  }

  setCurrentDir(parentDir);
};
