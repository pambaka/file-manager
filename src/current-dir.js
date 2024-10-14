import os from "node:os";
import fs from "node:fs/promises";
import path from "node:path";
import { customError, ERROR_CODE, ERROR_MESSAGE } from "./const.js";

let currentDir = os.homedir();

export const printCurrentDir = () => {
  console.log("\x1b[34m%s\x1b[0m", `You are currently in ${currentDir}`);
};

export const setCurrentDir = async (inputDir) => {
  try {
    if (!inputDir)
      throw new Error(ERROR_MESSAGE.invalidInput, { cause: customError });

    const dir = path.resolve(currentDir, inputDir);

    await fs.access(dir).then(() => {
      process.chdir(dir);
      currentDir = dir;
    });
  } catch (error) {
    if (error.cause === customError) console.error(error.message);
    else {
      let message = ERROR_MESSAGE.operationFailed;

      if (error.code === ERROR_CODE.noEntry)
        message += ` (${ERROR_MESSAGE.noEntry})`;
      else if (error.code === "EPERM") message += ` (Permission denied)`;

      console.error(message);
    }
  }
};

export const getCurrentDir = () => currentDir;
