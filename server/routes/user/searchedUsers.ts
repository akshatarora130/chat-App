import express, { Router, Response, RequestHandler } from "express";
import { authenticateJWT } from "../../middlewares/authenticateJWT";
import { User } from "../../databaseModels/userModel";

const router: Router = express.Router();

router.get("/user/searchedUsers", authenticateJWT, async (req, res) => {
    const keyword = String(req.query.search);

    if (!keyword) {
        return res.status(401).json({
            message: "search Parameter is missing"
        });
    }

    try {
        const users = await User.find({
            $and: [
                { _id: { $ne: req.user?._id } },
                {
                    $or: [
                        { name: { $regex: new RegExp(keyword, 'i') } },
                        { email: { $regex: new RegExp(keyword, 'i') } }
                    ]
                }
            ]
        });

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found matching the query' });
        }

        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
