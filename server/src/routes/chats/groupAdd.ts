import express, { Router, Request, Response } from "express";
import { authenticateJWT } from "../../middlewares/authenticateJWT";
import { checkAdminStatus } from "../../middlewares/checkAdminStatus";
import { Chat } from "../../databaseModels/chatModel";

const router: Router = express.Router();

router.put("/groupAdd", authenticateJWT, checkAdminStatus, async (req: Request, res: Response) => {
    const { chatId, userId } = req.body;

    try {
        const added = await Chat.findByIdAndUpdate(chatId, { $push: { users: userId } }, { new: true })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        if (!added) {
            res.status(404);
            throw new Error("Chat Not Found");
        } else {
            res.json(added);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
