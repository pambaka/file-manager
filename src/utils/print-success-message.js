const printSuccessMessage = (message) => {
  console.log("\x1b[32m%s\x1b[0m", `The file was successfully ${message}! :)`);
};

export default printSuccessMessage;
