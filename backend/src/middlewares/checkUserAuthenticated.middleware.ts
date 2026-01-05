import { Request, Response, NextFunction } from 'express';
import { HTTPSTATUS } from '../config/http.config';

export const checkUserAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated() || !req.user) {
        return res.status(HTTPSTATUS.UNAUTHORIZED).json({ message: "User not authorized" });
    }
    console.log("USER IS AUTHORIZED TO PROCEED !!!")
    next();
}