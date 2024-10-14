import path from "node:path";
import { getCurrentDir } from "./current-dir.js";
import copyFile from "./copy-file.js";
import removeFile from "./remove-file.js";
import printSuccessMessage from "./utils/print-success-message.js";
import getValidArgs from "./utils/get-valid-args.js";

const moveFile = async (str) => {
  try {
    const files = getValidArgs(str);

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
