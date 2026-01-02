import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler.middleware';
import { HTTPSTATUS } from '../config/http.config';
import {
    loginValidatorSchema,
    registerValidatorSchema
} from '../validators/auth.validator';
import {
    registerService,
    loginService
} from '../services/auth.service';

export const registerController = asyncHandler(async (req: Request, res: Response) => {

    const body = registerValidatorSchema.parse(req.body);

    const data = await registerService(body);

    return res
        .status(HTTPSTATUS.CREATED)
        .json({ message: "User registered successfully", data });
});

export const loginController = asyncHandler(async (req: Request, res: Response) => {

    const body = loginValidatorSchema.parse(req.body);

    await loginService(body);

    return res
        .status(HTTPSTATUS.OK)
        .json({
            message: "User logged in successfully",
            data: {

            }
        });
});