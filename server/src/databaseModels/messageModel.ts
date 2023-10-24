import mongoose from "mongoose";

export interface IMessage extends Document {
    sender: mongoose.Types.ObjectId;
    content: string;
    chat: mongoose.Types.ObjectId;
}

const messageSchema : mongoose.Schema<IMessage> = new mongoose.Schema<IMessage>(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        content: { type: String, trim: true },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat',
        },
    },
    {
        timestamps: true,
    }
);

export const Message : mongoose.Model<IMessage> = mongoose.model<IMessage>("Message", messageSchema);