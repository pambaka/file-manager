import { COMMAND } from "./const.js";
import exitFileManager from "./exit-file-manager.js";
import getUserName from "./get-user-name.js";
import { printCurrentDir, setCurrentDir } from "./current-dir.js";

const userName = getUserName();
console.log(`Welcome to the File Manager, ${userName}!`);

printCurrentDir();

process.stdin.on("data", (data) => {
  const dataStr = data.toString().trim();

  if (dataStr === COMMAND.exit) exitFileManager(userName);
  if (dataStr.startsWith(COMMAND.cd))
    setCurrentDir(dataStr.replace(`${COMMAND.cd} `, ""));

  printCurrentDir();
});

process.on("SIGINT", () => {
  exitFileManager(userName);
});
