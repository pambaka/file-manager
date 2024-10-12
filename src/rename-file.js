import fs from "node:fs/promises";
import { ERROR_MESSAGE } from "./const.js";
import path from "node:path";
import { getCurrentDir } from "./current-dir.js";

const renameFile = async (str) => {
  try {
    const files = str.split(" ");
    if (files.length !== 2) throw new Error(ERROR_MESSAGE.invalidInput);

    const oldFilePath = path.resolve(getCurrentDir(), files[0]);
    const newFilePath = path.resolve(getCurrentDir(), files[1]);

    await fs
      .access(oldFilePath)
      .then(async () => {
        await fs.access(newFilePath).then(
          () => {
            throw new Error(ERROR_MESSAGE.operationFailed);
          },
          async () => {
            await fs.rename(oldFilePath, newFilePath);
          }
        );
      })
      .catch(() => {
        throw new Error(ERROR_MESSAGE.operationFailed);
      });
  } catch (error) {
    console.error(error.message);
  }
};

export default renameFile;
