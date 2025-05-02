const { stdout } = process;

const getColorText = (message, initColor) => {
  const colorObj = {
    green: "\x1b[32m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    default: "\x1b[37m",
  };

  const color = initColor ? colorObj[initColor] : colorObj.default;
  return `${color}${message}\x1b[0m\n`;
};

export const writeMessage = (message, color) => {
  const text = getColorText(message, color);
  stdout.write(text);
};
