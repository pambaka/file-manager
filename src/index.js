import { COMMAND } from "./const.js";
import exitFileManager from "./exit-file-manager.js";
import getUserName from "./get-user-name.js";
import { printCurrentDir, setCurrentDir } from "./current-dir.js";
import listDirContent from "./list-dir-content.js";
import printOsInfo from "./print-os-info.js";
import calculateHash from "./calculate-hash.js";
import printFileContent from "./print-file-content.js";
import createFile from "./create-file.js";

const userName = getUserName();
console.log(`Welcome to the File Manager, ${userName}!`);

printCurrentDir();

process.stdin.on("data", async (data) => {
  const dataStr = data.toString().trim();

  switch (true) {
    case dataStr === COMMAND.exit:
      exitFileManager(userName);
      break;
    case dataStr.startsWith(COMMAND.add):
      await createFile(dataStr.replace(`${COMMAND.add}`, "").trim());
      break;
    case dataStr.startsWith(COMMAND.cat):
      await printFileContent(dataStr.replace(`${COMMAND.cat}`, "").trim());
      break;
    case dataStr.startsWith(COMMAND.cd):
      setCurrentDir(dataStr.replace(`${COMMAND.cd} `, ""));
      break;
    case dataStr.startsWith(COMMAND.hash):
      await calculateHash(dataStr.replace(`${COMMAND.hash}`, "").trim());
      break;
    case dataStr === COMMAND.ls:
      await listDirContent();
      break;
    case dataStr.startsWith(COMMAND.os):
      printOsInfo(dataStr.replace(`${COMMAND.os}`, "").trim());
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
