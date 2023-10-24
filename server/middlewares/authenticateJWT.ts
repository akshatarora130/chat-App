import jwt from 'jsonwebtoken';
import { SECRETKEY } from '../info/secretKey';
import { User, IUser } from '../databaseModels/userModel';
import { Model } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

declare global {
    namespace Express {
        interface Request {
            user: Model<IUser> | null;
        }
    }
}

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRETKEY, async (err, user) => {
            if (err) {
                return res.status(403).send('Token verification failed');
            }

            if (!user || typeof user === 'string') {
                return res.status(403).send('Invalid token or user data');
            }

            try {
                const userModel: Model<IUser> | null = await User.findOne({ email: user.email });
                console.log(userModel);
                if (userModel) {
                    req.user = userModel;
                    next();
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
};
