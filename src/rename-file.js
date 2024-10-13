import fs from "node:fs/promises";
import { ERROR_MESSAGE } from "./const.js";
import path from "node:path";
import { getCurrentDir } from "./current-dir.js";
import printSuccessMessage from "./utils/print-success-message.js";

const renameFile = async (str) => {
  try {
    const files = str.split(" ");
    if (files.length !== 2) throw new Error(ERROR_MESSAGE.invalidInput);

    if (files[1] !== path.parse(files[1]).base)
      throw new Error(
        `${ERROR_MESSAGE.invalidInput} (Second argument should be a file name, not a path)`
      );

    const oldFilePath = path.resolve(getCurrentDir(), files[0]);
    const newFilePath = path.resolve(path.dirname(oldFilePath), files[1]);

    await fs
      .access(oldFilePath)
      .then(async () => {
        await fs.access(newFilePath).then(
          () => {
            throw new Error(ERROR_MESSAGE.operationFailed);
          },
          async () => {
            await fs.rename(oldFilePath, newFilePath);
            printSuccessMessage("The file was successfully renamed! :)");
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
