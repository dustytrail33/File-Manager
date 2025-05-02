import { writeMessage } from "../utils/writeMessage.js";

export const exit = (username) => {
  writeMessage({
    message: `Thank you for using File Manager, ${username}, goodbye!`,
    color: "green",
    withDashes: true,
  });
  process.exit(0);
};
