"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { User } from "./usersModel";
// import { Message } from "./messagesModel";
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
//                 ref: User,
//             },
//         ],
//         latest: [
//             {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: Message,
//             },
//         ],
//         groupAdmin: [
//             {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: User,
//             },
//         ],
//     },
//     {
//         timestamps: true,
//     }
// );
//
// export const Chat : mongoose.Model<IChat> = mongoose.model<IChat>("Chat", chatSchema);
