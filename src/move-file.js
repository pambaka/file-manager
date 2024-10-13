import path from "node:path";
import { ERROR_MESSAGE } from "./const.js";
import { getCurrentDir } from "./current-dir.js";
import copyFile from "./copy-file.js";
import removeFile from "./remove-file.js";
import printSuccessMessage from "./utils/print-success-message.js";

const moveFile = async (str) => {
  try {
    const files = str.split(" ");
    if (files.length !== 2) throw new Error(ERROR_MESSAGE.invalidInput);

    const oldFilePath = path.resolve(getCurrentDir(), files[0]);

    await copyFile(str, true).then(
      async () => {
        await removeFile(oldFilePath, true);
        printSuccessMessage("moved");
      },
      (error) => {
        throw error;
      }
    );
  } catch (error) {
    console.error(error.message);
  }
};

export default moveFile;
