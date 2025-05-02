/**
 * argument parsing
 * @param {string[]} args
 * @returns {Record<string, string|boolean>}
 */

export const parseArgs = (args) => {
  const newArgs = args.slice(2);

  const argsList = newArgs.reduce((list, arg) => {
    if (arg.startsWith("--")) {
      const [key, value] = arg.split("=");
      list[key] = value !== undefined ? value : true;
    }
    return list;
  }, {});

  return argsList;
};
