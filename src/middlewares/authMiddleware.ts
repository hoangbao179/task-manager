import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpStatusCode } from '../enums/http.status';
import { TokenPayload } from '../models/token/ITokenPayLoad';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Access token not provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    if (!decoded || !decoded.userId) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid token' });
    }

    (req as any).userId = decoded.userId;
    next();

  } catch (error) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Invalid token or expired token' });
  }
};
