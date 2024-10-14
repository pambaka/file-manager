import fs from "node:fs/promises";
import { getCurrentDir } from "./current-dir.js";
import path from "node:path";
import { ERROR_CODE, ERROR_MESSAGE } from "./const.js";
import printSuccessMessage from "./utils/print-success-message.js";

const createFile = async (file) => {
  try {
    const filePath = path.resolve(getCurrentDir(), file);

    await fs.writeFile(filePath, "", { flag: "wx" });
    printSuccessMessage("created");
  } catch (error) {
    let message = ERROR_MESSAGE.operationFailed;

    if (error.code === ERROR_CODE.exist)
      message += ` (${ERROR_MESSAGE.fileExists})`;

    console.error(message);
  }
};

export default createFile;
