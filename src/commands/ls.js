import { promises } from "fs";
import { getState } from "../state/state.js";
import { writeMessage } from "../utils/writeMessage.js";

export const ls = async () => {
  const { currentDir } = getState();

  try {
    await promises.access(currentDir);

    const entries = await promises.readdir(currentDir, { withFileTypes: true });

    const folders = [];
    const files = [];

    entries.forEach((entry) => {
      if (entry.isDirectory()) {
        folders.push({ Name: entry.name, Type: "directory" });
      } else {
        files.push({ Name: entry.name, Type: "file" });
      }
    });

    folders.sort((a, b) => a.Name.localeCompare(b.Name));
    files.sort((a, b) => a.Name.localeCompare(b.Name));

    const list = [...folders, ...files];

    console.log("\n");
    console.table(list);
  } catch (error) {
    writeMessage({ message: "\nFailed to list directory", color: "red" });
  }
};
