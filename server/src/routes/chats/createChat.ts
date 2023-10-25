import express, { Router, Request, Response } from "express";
import { authenticateJWT } from "../../middlewares/authenticateJWT";
import { Chat, IChat } from "../../databaseModels/chatModel";
import { User } from "../../databaseModels/userModel";

const router: Router = express.Router();

router.post("/createChat", authenticateJWT, async (req: Request, res: Response) => {
    try {
        const {userId}  = req.body;

        if (!userId) {
            return res.status(400).json({
                message: "UserID not sent with the request",
            });
        }

        const isChat: IChat[] = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: {$eq: req.user?._id } } },
                { users: { $elemMatch: {$eq : userId } } },
            ],
        }).populate("users", "-password").populate("latest");

        const populatedIsChat = await User.populate(isChat, {
            path: "latest.sender",
            select: "name email profilePic",
        });

        if (populatedIsChat.length > 0) {
            return res.status(200).json(populatedIsChat[0]);
        }

        const chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [userId, req.user?._id],
        };

        const createdChat = new Chat(chatData);
        await createdChat.save();
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
            "users",
            "-password"
        );
        res.status(200).json(FullChat);
    } catch (error: any) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
