import zlib from "node:zlib";
import { pipeline } from "node:stream/promises";
import fs from "node:fs";
import path from "node:path";
import { getCurrentDir } from "./current-dir.js";
import { customError, ERROR_MESSAGE } from "./const.js";
import handleError from "./utils/handle-error.js";
import printSuccessMessage from "./utils/print-success-message.js";

const decompressFile = async (str) => {
  try {
    const files = str.split(" ");

    if (files.length !== 2)
      throw new Error(ERROR_MESSAGE.invalidInput, { cause: customError });

    const archivePath = path.resolve(getCurrentDir(), files[0]);
    const filePath = path.resolve(getCurrentDir(), files[1]);

    const readStream = fs.createReadStream(archivePath);
    const decompress = zlib.createBrotliDecompress();
    const writeStream = fs.createWriteStream(filePath, { flags: "wx" });

    await pipeline(readStream, decompress, writeStream);
    printSuccessMessage("decompressed");
  } catch (error) {
    if (error.code === "Z_BUF_ERROR")
      console.error(`${ERROR_MESSAGE.operationFailed} (Invalid archive file)`);
    else {
      handleError(error);
    }
  }
};

export default decompressFile;
