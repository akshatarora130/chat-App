import express, {Router} from "express";
import {authenticateJWT} from "../../middlewares/authenticateJWT";
import {Message} from "../../databaseModels/messageModel";
import {Chat} from "../../databaseModels/chatModel";
import {z} from "zod";

const router: Router = express.Router();

const messageSchema = z.object({
    content: z.string().min(1).max(500),
    chatId: z.string()
})

router.post("/sendMessage", authenticateJWT, async(req, res) => {
    const parsedInput = messageSchema.safeParse(req.body);

    if(!parsedInput.success){
        return res.status(411).json({
            error: parsedInput.error,
        })
    }

    const {content, chatId} = parsedInput.data;

    if(!content || !chatId){
        return res.status(400).json({message: "Invalid data passed to the request"})
    }

    try{
        const newMessage = new Message({
            sender: req.user?._id,
            content: content,
            chat: chatId
        })

        const savedMessage = await newMessage.save();

        await Chat.findByIdAndUpdate(chatId, {latest: newMessage})

        var populatedMessage: any = await Message.populate(savedMessage, [
            { path: 'sender', select: 'name profilePic email' },
            { path: 'chat' },
        ]);

        populatedMessage.chat = await Chat.populate(populatedMessage.chat, [
            {path: 'user', select: '-password'}, { path: 'latest'}, {path: 'groupAdmin'}]);

        res.status(201).json(populatedMessage);
    }
    catch (e){
        console.error('Error sending message:', e);
        res.status(500).json({ message: 'Server error' });
    }
})

export default router;