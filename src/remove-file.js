import path from "path";
import fs from "node:fs/promises";
import { getCurrentDir } from "./current-dir.js";
import { customError, ERROR_MESSAGE } from "./const.js";

const removeFile = async (file) => {
  try {
    if (!file)
      throw new Error(ERROR_MESSAGE.invalidInput, { cause: customError });

    const filePath = path.resolve(getCurrentDir(), file);
    await fs.rm(filePath);
  } catch (error) {
    if (error.cause === customError) console.error(error.message);
    else console.error(ERROR_MESSAGE.operationFailed);
  }
};

export default removeFile;
