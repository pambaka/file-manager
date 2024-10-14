import { customError, ERROR_MESSAGE } from "../const.js";

const getArgs = (str) => {
  const strArr = str.split('"');

  const args = strArr
    .filter(Boolean)
    .filter((arg) => !arg.split("").every((char) => char === " "))
    .map((arg) => arg.trim());

  return args;
};

const getValidArgs = (str, argsNum = 2) => {
  let args = str.split(" ");

  if (args.length !== argsNum) {
    args = getArgs(str);
    if (args.length !== argsNum)
      throw new Error(ERROR_MESSAGE.invalidInput, { cause: customError });
  }

  return args;
};

export default getValidArgs;
