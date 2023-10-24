import { Router } from 'express';
import { Request, Response } from 'express';
import { z } from 'zod';
import { User } from '../../databaseModels/userModel';
import jwt from 'jsonwebtoken';
import { SECRETKEY } from '../../info/secretKey';

const router = Router();

const signUpSchema = z.object({
    name: z.string().min(1).max(15),
    email: z.string().email(),
    password: z.string().min(6).max(20),
    profilePic: z.string(),
});

router.post('/signup', async (req: Request, res: Response) => {
    const parsedInput = signUpSchema.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(422).json({
            error: parsedInput.error,
        });
    }
    const { name, email, password, profilePic } = parsedInput.data;
    try {
        const user = await User.findOne({ email });
        if (user) {
            res.status(401).json({
                message: 'User Already exists',
            });
        } else {
            const newUser = new User({
                name,
                email,
                password,
                profilePic,
            });
            await newUser.save();
            const token = jwt.sign({ email }, SECRETKEY);
            res.status(201).json({
                message: 'User created Successfully',
                userInfo: newUser,
                token,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
        });
    }
});

export default router;
