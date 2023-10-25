import express, {Router} from "express";
import {authenticateJWT} from "../../middlewares/authenticateJWT";
import {Message} from "../../databaseModels/messageModel";

const router: Router = express.Router();

router.get("/fetchMessages/:chatId", authenticateJWT, async (req, res) => {
    try{
        const messages = await Message.find({chat: req.params.chatId}).populate("sender", "name pic email").populate("chat");
        res.json(messages);
    }
    catch (error){
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
})

export default router;