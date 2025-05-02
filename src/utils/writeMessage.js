const { stdout } = process;

const getColorText = (message, initColor) => {
  const colorObj = {
    green: "\x1b[32m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    default: "\x1b[37m",
  };

  const color = initColor ? colorObj[initColor] : colorObj.default;
  return `${color}${message}\x1b[0m`;
};

const writeMessageWithDashes = (text) => {
  writeMessage({
    message: "\n------------------------------",
    color: "yellow",
  });
  stdout.write(text + "\n");
  writeMessage({
    message: "------------------------------\n",
    color: "yellow",
  });
};

/**
 *
 * @param {Object} params
 * @param {string} params.message
 * @param {string} [params.color]
 * @param {boolean} [params.withDashes=false]
 */
export const writeMessage = ({ message, color, withDashes }) => {
  // console.log('333', message, color, withDashes )
  const text = getColorText(message, color);
  if (withDashes) {
    writeMessageWithDashes(text);
  } else {
    stdout.write(text + "\n");
  }
};
