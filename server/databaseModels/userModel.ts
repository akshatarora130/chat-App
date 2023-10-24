import mongoose from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    profilePic: string;
}

const userSchema : mongoose.Schema<IUser> = new mongoose.Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        profilePic: {
            type: String,
            default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
        },
    },
    {
        timestamps: true,
    }
);

export const User: mongoose.Model<IUser> = mongoose.model<IUser>("User", userSchema);