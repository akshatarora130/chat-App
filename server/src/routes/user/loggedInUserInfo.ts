import express, {Router} from "express";
import jwt from "jsonwebtoken";
import {SECRETKEY} from "../../info/secretKey";
import {User} from "../../databaseModels/userModel";
import {updatedIUser} from "../../middlewares/authenticateJWT";

const router : Router = express.Router();

router.get("/userInfo", async (req, res) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRETKEY, async (err, user) => {
            if (err) {
                return res.status(403).send('Token verification failed');
            }

            if (!user || typeof user === 'string') {
                return res.status(403).send('Login Again');
            }

            try {
                const userModel: updatedIUser | null = await User.findOne({ email: user.email });
                if (userModel) {
                    res.status(200).send(userModel)
                } else {
                    res.status(403).send('User not found');
                }
            } catch (error) {
                res.status(500).send('Server error');
            }
        });
    } else {
        res.status(403).send('authHeader not found');
    }
})

export default router;