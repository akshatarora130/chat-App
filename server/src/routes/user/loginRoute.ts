import {z} from "zod";
import express, {Request, Response, Router} from "express";
import {User} from "../../databaseModels/userModel";
import jwt from "jsonwebtoken";
import {SECRETKEY} from "../../info/secretKey";

const router: Router = express.Router();

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(20)
})

router.post("/login", async (req: Request, res: Response) => {
    const parsedInput = loginSchema.safeParse(req.body);
    if(!parsedInput.success){
        return res.status(411).json({
            error: parsedInput.error,
        })
    }
    const { email, password } = parsedInput.data;

    try {
        const user = await User.findOne({ email, password });

        if (user) {
            const token = jwt.sign({ email }, SECRETKEY);
            res.status(201).json({
                message: "Logged in successfully",
                userInfo: user,
                token: token,
            });
        } else {
            res.status(403).json({
                message: "Invalid email or password",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        });
    }
});

export default router;