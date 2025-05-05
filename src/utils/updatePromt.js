export const updatePrompt = (rl, newPrompt) => {
  rl.setPrompt(`${newPrompt}> `);
  rl.prompt();
};
