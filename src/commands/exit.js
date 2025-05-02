import { writeMessage } from "../utils/writeMessage.js";

export const exit = (username) => {
  writeMessage(
    `Thank you for using File Manager, ${username}, goodbye!`,
    "green"
  );
  process.exit(0);
};
