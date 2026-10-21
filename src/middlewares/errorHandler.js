import { createError, errorResponse } from "../utils/apiResponse.js";
import { ERROR_CODES } from "../utils/errorDictionary.js";
import logger from "../config/logger.js";

export const errorHandler = (error, req, res, next) => {
  let handledError = error;

  if(error.name === "CastError"){
    handledError = createError(ERROR_CODES.VALIDATION_ERROR, "ID invalido");
  }

  const statusCode = handledError.statusCode || 500
  const code = handledError.code || ERROR_CODES.INTERNAL_SERVER_ERROR
  const line = `${code} - ${handledError.message} - ${req.method} ${req.originalUrl}`
  
  if(statusCode >=500){
    logger.error(line)
  }else{
    logger.warning(line)
  }

  return errorResponse(res, handledError);
};
