import { customError, ERROR_MESSAGE } from "../const.js";

const handleError = (error) => {
  if (error.cause === customError) console.error(error.message);
  else {
    let message = ERROR_MESSAGE.operationFailed;

    console.error(message);
  }
};

export default handleError;
