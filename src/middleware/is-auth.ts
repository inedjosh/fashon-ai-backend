const jwt = require("jsonwebtoken");
import { NextFunction, Request, Response } from "express";
import { sendUnAuthorizedError } from "../helpers/errors/commonAppErrors";
import asyncHandler from "../utils/asyncHandler";
import logger from "../utils/logger";

export default asyncHandler(
    async (req:Request, res:Response, next:NextFunction) => {
    const authHeader = req.get("Authorization");
    
  if (!authHeader) next(sendUnAuthorizedError("Could not authenticate, please login and try again."))
    
  const token = authHeader?.split(" ")[1];
        let decodedUser;
  try {
    decodedUser = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    next(
        sendUnAuthorizedError("Authentication failed, please login and try again."))
  }

  logger.info(decodedUser);

  req.user = decodedUser;
 
  next();
}
)
