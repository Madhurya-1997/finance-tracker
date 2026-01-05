import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler.middleware';
import { HTTPSTATUS } from '../config/http.config';

export const oAuth2GithubLoginRedirectController = asyncHandler(async (req: Request, res: Response) => {
    // res.sendStatus(HTTPSTATUS.CREATED).redirect(Env.FRONTEND_ORIGIN);
    res.sendStatus(HTTPSTATUS.OK);
});

export const logoutController = asyncHandler(async (req: Request, res: Response) => {
    if (!req.isAuthenticated() || !req.user) {
        return res.sendStatus(HTTPSTATUS.UNAUTHORIZED);
    }

    req.logOut((err) => {
        if (err) {
            return res.sendStatus(HTTPSTATUS.BAD_REQUEST);
        }

        res.sendStatus(HTTPSTATUS.OK);
    })
});