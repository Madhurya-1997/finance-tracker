import mongoose from "mongoose";
import UserModel from "../models/user.model";
import { AppError, NotFoundException, ResourceConflictException, UnauthorizedException } from "../utils/app-error";
import { LoginValidatorSchemaType, RegisterValidatorSchemaType } from "../validators/auth.validator";
import ReportSettingModel from "../models/report-setting.model";
import { calculateNextReportDate } from "../utils/helper";

export const registerService = async (body: RegisterValidatorSchemaType) => {
    const { email } = body;

    // need a mongoose transactions' session to create a report setting after user registration
    const session = await mongoose.startSession();

    try {
        const registeredUser = await session.withTransaction(async () => {
            // check if user exists with the email
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                throw new ResourceConflictException('User already exists');
            }
            // create a new user model
            const newUser = new UserModel({
                ...body
            });

            // save user to user table in db
            await newUser.save({ session });

            // create a report setting once a user registers
            const reportSetting = new ReportSettingModel({
                userId: newUser._id,
                // frequency: 'MONTHLY',
                isEnabled: true,
                nextReportDate: calculateNextReportDate(),
                lastSentDate: null
            });
            await reportSetting.save({ session });

            return { user: newUser.omitPassword() };
        });

        return registeredUser;
    } catch (error) {
        throw error;
    } finally {
        await session.endSession();
    }

}

export const loginService = async (body: LoginValidatorSchemaType) => {
    const { email, password } = body;

    //check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new NotFoundException("User email not found");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        throw new UnauthorizedException("Invalid user email/password");
    }

    return {}
}