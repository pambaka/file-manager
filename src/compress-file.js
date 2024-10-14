import zlib from "node:zlib";
import { pipeline } from "node:stream/promises";
import fs from "node:fs";
import path from "node:path";
import { getCurrentDir } from "./current-dir.js";
import handleError from "./utils/handle-error.js";
import printSuccessMessage from "./utils/print-success-message.js";
import getValidArgs from "./utils/get-valid-args.js";

const compressFile = async (str) => {
  try {
    const files = getValidArgs(str);

    const filePath = path.resolve(getCurrentDir(), files[0]);
    const archivePath = path.resolve(getCurrentDir(), files[1]);

    const readStream = fs.createReadStream(filePath);
    const compress = zlib.createBrotliCompress();
    const writeStream = fs.createWriteStream(archivePath, { flags: "wx" });

    await pipeline(readStream, compress, writeStream);
    printSuccessMessage("compressed");
  } catch (error) {
    handleError(error);
  }
};

export default compressFile;
