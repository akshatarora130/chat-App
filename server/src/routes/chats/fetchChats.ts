import express, { Router, Request, Response } from 'express';
import { authenticateJWT } from '../../middlewares/authenticateJWT';
import { Chat, IChat } from '../../databaseModels/chatModel';
import { User } from '../../databaseModels/userModel';

const router: Router = express.Router();

router.get('/fetchChats', authenticateJWT, async (req: Request, res: Response) => {
    try {
        const result: IChat[] = await Chat.find({
            users: { $elemMatch: { $eq: req.user?._id } },
        })
            .populate('users', '-password')
            .populate('groupAdmin', '-password')
            .populate('latest')
            .sort({ updatedAt: -1 });

        const populatedResult = await User.populate(result, {
            path: 'latest.sender',
            select: 'name email profilePic',
        });

        res.status(200).json(populatedResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
