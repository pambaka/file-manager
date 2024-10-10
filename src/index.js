import { COMMAND } from "./const.js";
import exitFileManager from "./exit-file-manager.js";
import getUserName from "./get-user-name.js";
import { printCurrentDir } from "./current-dir.js";

const userName = getUserName();
console.log(`Welcome to the File Manager, ${userName}!`);

printCurrentDir();

process.stdin.on("data", (data) => {
  if (data.toString().trim() === COMMAND.exit) {
    exitFileManager(userName);
  }

  printCurrentDir();
});

process.on("SIGINT", () => {
  exitFileManager(userName);
});
