import { ERROR_MESSAGE, OS_ARG } from "./const.js";
import os from "node:os";

const printOsInfo = (inputArg) => {
  const startChars = "--";

  try {
    if (!inputArg.startsWith(startChars) || inputArg.split(" ").length !== 1)
      throw new Error(ERROR_MESSAGE.invalidInput);

    const arg = inputArg.replace(startChars, "");

    switch (arg) {
      case OS_ARG.EOL:
        console.log(JSON.stringify(os.EOL));
        break;
      case OS_ARG.architecture:
        console.log(os.arch());
        break;
      case OS_ARG.cpus:
        console.log(`Number of CPUs: ${os.cpus().length}`);
        console.log(
          os
            .cpus()
            .map((cpu) => ({ model: cpu.model, speed: cpu.speed / 1000 }))
        );
        break;
      case OS_ARG.homedir:
        console.log(os.homedir());
        break;
      case OS_ARG.username:
        console.log(os.userInfo().username);
        break;
      default:
        throw new Error(ERROR_MESSAGE.invalidInput);
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default printOsInfo;
