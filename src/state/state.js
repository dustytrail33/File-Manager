let currentDir = "";
let username = "";

export const getState = () => ({
  currentDir,
  username,
});

export const setCurrentDir = (newDir) => {
  currentDir = newDir;
};

export const setUserName = (newName) => {
  username = newName;
};
