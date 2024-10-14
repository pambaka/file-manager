import path from "node:path";
import fs from "node:fs";
import * as fsPromises from "node:fs/promises";
import { getCurrentDir } from "./current-dir.js";
import { customError, ERROR_CODE, ERROR_MESSAGE } from "./const.js";
import { pipeline } from "node:stream/promises";
import printSuccessMessage from "./utils/print-success-message.js";

const copyFile = async (str, shouldThrowError = false) => {
  try {
    const files = str.split(" ");
    if (files.length !== 2)
      throw new Error(ERROR_MESSAGE.invalidInput, { cause: customError });

    const filePath = path.resolve(getCurrentDir(), files[0]);
    const fileName = path.parse(filePath).base;
    const newFilePath = path.resolve(getCurrentDir(), files[1], fileName);

    await fsPromises.access(filePath).then(
      async () => {
        const readStream = fs.createReadStream(filePath);
        const writeStream = fs.createWriteStream(newFilePath, { flags: "wx" });

        await pipeline(readStream, writeStream);
        if (!shouldThrowError) printSuccessMessage("copied");
      },
      (error) => {
        throw error;
      }
    );
  } catch (error) {
    if (error.cause === customError) {
      console.error(error.message);
    } else {
      let message = ERROR_MESSAGE.operationFailed;

      if (error.code === ERROR_CODE.exist)
        message += ` (${ERROR_MESSAGE.fileExists})`;
      if (error.code === ERROR_CODE.noEntry)
        message += ` (${ERROR_MESSAGE.noEntry})`;

      if (shouldThrowError) throw new Error(message);
      console.error(message);
    }
  }
};

export default copyFile;
