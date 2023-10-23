"use strict";
// import mongoose from "mongoose";
// import {mongooseUrl} from "../info/mongooseConnect";
//
// interface IUser extends Document {
//     name: string;
//     email: string;
//     password: string;
//     profilePic: string;
// }
//
// const userSchema : mongoose.Schema<IUser> = new mongoose.Schema<IUser>(
//     {
//         name: { type: String, required: true },
//         email: { type: String, required: true },
//         password: { type: String, required: true },
//         profilePic: {
//             type: String,
//             default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
//         },
//     },
//     {
//         timestamps: true,
//     }
// );
//
// export const User: mongoose.Model<IUser> = mongoose.model<IUser>("User", userSchema);
//
// interface IChat extends Document {
//     chatName: string;
//     isGroupChat: boolean;
//     user: mongoose.Types.ObjectId[];
//     latest: mongoose.Types.ObjectId[];
//     groupAdmin: mongoose.Types.ObjectId[];
// }
//
// const chatSchema : mongoose.Schema<IChat> = new mongoose.Schema<IChat>(
//     {
//         chatName: { type: String, trim: true },
//         isGroupChat: { type: Boolean, default: false },
//         user: [
//             {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'User',
//             },
//         ],
//         latest: [
//             {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'Message',
//             },
//         ],
//         groupAdmin: [
//             {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'User',
//             },
//         ],
//     },
//     {
//         timestamps: true,
//     }
// );
//
// export const Chat : mongoose.Model<IChat> = mongoose.model<IChat>("Chat", chatSchema);
//
// interface IMessage extends Document {
//     sender: mongoose.Types.ObjectId;
//     content: string;
//     chat: mongoose.Types.ObjectId;
// }
//
// const messageSchema : mongoose.Schema<IMessage> = new mongoose.Schema<IMessage>(
//     {
//         sender: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User',
//         },
//         content: { type: String, trim: true },
//         chat: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Chat',
//         },
//     },
//     {
//         timestamps: true,
//     }
// );
//
// export const Message : mongoose.Model<IMessage> = mongoose.model<IMessage>("Message", messageSchema);
//
