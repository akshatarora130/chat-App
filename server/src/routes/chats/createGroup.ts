import express, { Router, Request, Response } from "express";
import { authenticateJWT } from "../../middlewares/authenticateJWT";
import { z } from "zod";
import { Chat } from "../../databaseModels/chatModel";

const router: Router = express.Router();

const createGroupChatSchema = z.object({
    name: z.string().min(1).max(15),
    users: z.any(),
});

router.post("/createGroup", authenticateJWT, async (req: Request, res: Response) => {
    const parsedInput = createGroupChatSchema.safeParse(req.body);

    if (!parsedInput.success) {
        return res.status(400).json({
            error: parsedInput.error.issues,
        });
    }

    const users = parsedInput.data.users

    if (users.length < 2) {
        return res.status(400).json({ message: "Minimum 2 users needed to create a group" });
    }

    users.push(req.user);

    try {
        const newGroupChat = new Chat({
            chatName: parsedInput.data.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const groupChat = await newGroupChat.save();

        const fullChat = await Chat.findOne({ _id: groupChat._id }).populate('users', "password").populate("groupAdmin", "-password");

        res.status(201).json(fullChat);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
