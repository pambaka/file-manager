import path from "node:path";
import fs from "node:fs";
import { getCurrentDir } from "./current-dir.js";
import { createHash } from "node:crypto";
import { pipeline } from "node:stream/promises";
import os from "node:os";
import { Writable } from "node:stream";
import { ERROR_MESSAGE } from "./const.js";

const calculateHash = async (inputPath) => {
  try {
    const filePath = path.resolve(getCurrentDir(), inputPath);
    const readStream = fs.createReadStream(filePath);

    const hash = createHash("sha256").setEncoding("hex");

    const writeStream = new Writable({
      write(chunk, encoding, cb) {
        process.stdout.write(`${chunk}${os.EOL}`);
        cb();
      },
    });

    await pipeline(readStream, hash, writeStream);
  } catch {
    console.error(ERROR_MESSAGE.operationFailed);
  }
};

export default calculateHash;
