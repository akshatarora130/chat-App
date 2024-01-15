import { Request, Response, NextFunction } from "express";
import { Chat } from "../databaseModels/chatModel";

export const checkAdminStatus = async (req: Request, res: Response, next: NextFunction) => {
  const { chatId } = req.body;
  const chat = await Chat.findOne({ _id: chatId, groupAdmin: req.user?._id });

  if (!chat) {
    return res.status(403).json({ message: 'Permission denied. You are not the group admin.' });
  }
  next();
}
