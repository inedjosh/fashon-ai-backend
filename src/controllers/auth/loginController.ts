import asyncHandler from "../../utils/asyncHandler";
import { NextFunction, Request, Response } from "express";
import { sendInvalidLoginCredentialsError, sendUserAccountNotAvailableError } from "../../helpers/errors/commonAppAuthErrors";
import findUserByEmail from "../../utils/auth/findUserByEmail";
import createAuthTokenAndSendToUser from "../../utils/auth/createAuthTokenAndSendToUser";
import logger from "../../utils/logger";
import { compareString } from "../../utils/auth/hash";

export default asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => { 

        const { email, password } = req.body;

        if (!email || !password) next(sendInvalidLoginCredentialsError())
        
        const findUser = await findUserByEmail(email)
        
        if (!findUser) next(sendUserAccountNotAvailableError())
        
        console.log(password, findUser.password);

         // compare passwords
        const validatePassword = await findUser.isValidPassword(
             password,
             findUser.password
        );

        logger.info(validatePassword)
        if (!validatePassword) next(sendInvalidLoginCredentialsError())
        
      createAuthTokenAndSendToUser(res, findUser, 'logged')
    }
)