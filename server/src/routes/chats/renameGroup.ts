import express, { Router, Request, Response } from "express";
import { authenticateJWT } from "../../middlewares/authenticateJWT";
import { Chat } from "../../databaseModels/chatModel";
import { z } from "zod";

const router: Router = express.Router();

const renameGroupSchema = z.object({
    chatId: z.string(),
    chatName: z.string().min(1).max(15),
});

router.put("/renameGroup", authenticateJWT, async (req: Request, res: Response) => {
    const parsedInput = renameGroupSchema.safeParse(req.body);

    if (!parsedInput.success) {
        return res.status(400).json({
            error: parsedInput.error.issues,
        });
    }

    const { chatId, chatName } = parsedInput.data;

    try {
        const updatedChat = await Chat.findByIdAndUpdate(chatId, { chatName: chatName }, { new: true })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        if (!updatedChat) {
            res.status(404);
            throw new Error("Chat Not Found");
        } else {
            res.json(updatedChat);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
