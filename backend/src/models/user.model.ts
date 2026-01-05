import mongoose, { Document, Schema } from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

export interface UserDocument extends Document {
    githubId: string;
    name: string;
    profilePicture: string | null;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
    {
        githubId: {
            type: mongoose.Schema.Types.String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        profilePicture: {
            type: String,
            default: null,
        }
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;