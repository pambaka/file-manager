import { COMMAND } from "./const.js";
import exitFileManager from "./exit-file-manager.js";
import getUserName from "./get-user-name.js";
import { printCurrentDir, setCurrentDir } from "./current-dir.js";
import listDirContent from "./list-dir-content.js";
import printOsInfo from "./print-os-info.js";
import calculateHash from "./calculate-hash.js";
import printFileContent from "./print-file-content.js";
import createFile from "./create-file.js";
import renameFile from "./rename-file.js";
import copyFile from "./copy-file.js";
import moveFile from "./move-file.js";
import removeFile from "./remove-file.js";

const userName = getUserName();
console.log(`Welcome to the File Manager, ${userName}!`);

printCurrentDir();

process.stdin.on("data", async (data) => {
  const dataStr = data.toString().trim();

  const getArgs = (command) => dataStr.replace(command, "").trim();

  switch (true) {
    case dataStr === COMMAND.exit:
      exitFileManager(userName);
      break;
    case dataStr.startsWith(COMMAND.add):
      await createFile(getArgs(COMMAND.add));
      break;
    case dataStr.startsWith(COMMAND.cat):
      await printFileContent(getArgs(COMMAND.cat));
      break;
    case dataStr.startsWith(COMMAND.cd):
      setCurrentDir(getArgs(COMMAND.cd));
      break;
    case dataStr.startsWith(COMMAND.cp):
      await copyFile(getArgs(COMMAND.cp));
      break;
    case dataStr.startsWith(COMMAND.hash):
      await calculateHash(getArgs(COMMAND.hash));
      break;
    case dataStr === COMMAND.ls:
      await listDirContent();
      break;
    case dataStr.startsWith(COMMAND.mv):
      await moveFile(getArgs(COMMAND.mv));
      break;
    case dataStr.startsWith(COMMAND.os):
      printOsInfo(getArgs(COMMAND.os));
      break;
    case dataStr.startsWith(COMMAND.rename):
      await renameFile(getArgs(COMMAND.rename));
      break;
    case dataStr.startsWith(COMMAND.rm):
      await removeFile(getArgs(COMMAND.rm));
      break;
    case dataStr === COMMAND.up:
      setCurrentDir("..");
      break;
    default:
      break;
  }

  printCurrentDir();
});

process.on("SIGINT", () => {
  exitFileManager(userName);
});
