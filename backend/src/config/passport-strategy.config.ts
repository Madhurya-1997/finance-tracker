import passport from 'passport';
import { Strategy as GithubStrategy, Profile } from 'passport-github2';
import { Env } from './env.config';
import UserModel from '../models/user.model';
import ReportSettingModel from '../models/report-setting.model';
import { calculateNextReportDate } from '../utils/helper';
import mongoose from 'mongoose';

export default passport.use(
    new GithubStrategy({
        clientID: Env.OAUTH2_GITHUB_CLIENT_ID,
        clientSecret: Env.OAUTH2_GITHUB_CLIENT_SECRET,
        callbackURL: Env.OAUTH2_GITHUB_REDIRECT_URI,
    }, async (accessToken: string, refreshToken: string, profile: Profile | any, done: any) => {
        try {
            console.log({ accessToken, refreshToken });
            const session = await mongoose.startSession();

            try {
                const loggedInUser = await session.withTransaction(async () => {
                    // check if user already exists
                    const existingUser = await UserModel.findOne({ githubId: profile.id });
                    if (existingUser) {
                        return existingUser;//done(null, existingUser);
                    }

                    // create a new user model
                    const newUser = new UserModel({
                        githubId: profile.id,
                        name: profile.displayName,
                        profilePicture: profile.photos[0].value
                    });

                    // save user to user table in db
                    await newUser.save({ session });

                    // create a report setting once a user logs in
                    const reportSetting = new ReportSettingModel({
                        userId: newUser._id,
                        // frequency: 'MONTHLY',
                        isEnabled: true,
                        nextReportDate: calculateNextReportDate(),
                        lastSentDate: null
                    });
                    await reportSetting.save({ session });

                    return newUser; //done(null, newUser);
                });

                return done(null, loggedInUser)
            } catch (error) {
                return done(error, null);
            } finally {
                await session.endSession();
            }
        } catch (error) {
            return done(error, null);
        }

    })
);

//configure Passport to persist user information in the login session
passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser(async (user: any, done) => {
    try {
        const foundUser = await UserModel.findById(user._id) as Express.User;
        if (foundUser) {
            return done(null, foundUser);
        }
        return done(null, null);

    } catch (error) {
        done(error, null);
    }
});
