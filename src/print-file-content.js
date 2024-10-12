import fs from "node:fs";
import { getCurrentDir } from "./current-dir.js";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import os from "node:os";
import { Writable } from "node:stream";
import { ERROR_MESSAGE } from "./const.js";

const printFileContent = async (file) => {
  try {
    const filePath = path.resolve(getCurrentDir(), file);

    const readStream = fs.createReadStream(filePath);

    const writeStream = new Writable({
      write(chunk, encoding, cb) {
        process.stdout.write(chunk + os.EOL);
        cb();
      },
    });

    await pipeline(readStream, writeStream);
  } catch {
    console.error(ERROR_MESSAGE.operationFailed);
  }
};

export default printFileContent;
