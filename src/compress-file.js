import zlib from "node:zlib";
import { pipeline } from "node:stream/promises";
import fs from "node:fs";
import path from "node:path";
import { getCurrentDir } from "./current-dir.js";
import { customError, ERROR_MESSAGE } from "./const.js";
import handleError from "./utils/handle-error.js";
import printSuccessMessage from "./utils/print-success-message.js";

const compressFile = async (str) => {
  try {
    const files = str.split(" ");

    if (files.length !== 2)
      throw new Error(ERROR_MESSAGE.invalidInput, { cause: customError });

    const filePath = path.resolve(getCurrentDir(), files[0]);
    const archivePath = path.resolve(getCurrentDir(), files[1]);

    const readStream = fs.createReadStream(filePath);
    const compress = zlib.createGzip();
    const writeStream = fs.createWriteStream(archivePath, { flags: "wx" });

    await pipeline(readStream, compress, writeStream);
    printSuccessMessage("compressed");
  } catch (error) {
    handleError(error);
  }
};

export default compressFile;
