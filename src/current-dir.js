import os from "node:os";
import fs from "node:fs";
import path from "node:path";

let currentDir = os.homedir();

export const printCurrentDir = () => {
  console.log(`You are currently in ${currentDir}`);
};

export const setCurrentDir = (inputDir) => {
  const dir = path.normalize(inputDir);

  let newDir;
  if (path.isAbsolute(dir)) newDir = dir;
  else newDir = path.join(currentDir, dir);

  if (fs.existsSync(newDir)) currentDir = newDir;
};

export const getCurrentDir = () => currentDir;
