import { Router } from "express";
import {
    oAuth2GithubLoginRedirectController,
    logoutController
} from "../controllers/auth.controller";
import { passportAuthenticateGithub } from "../config/passport.config";
import '../config/passport-strategy.config';

const authRoutes = Router();

authRoutes.get('/github', passportAuthenticateGithub);
authRoutes.get('/github/redirect', passportAuthenticateGithub, oAuth2GithubLoginRedirectController);

authRoutes.post('/logout', logoutController);

export default authRoutes;