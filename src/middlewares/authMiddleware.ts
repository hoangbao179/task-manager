import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IResponseData } from '../models/response';
import { HttpStatusCode } from '../enums/http.status';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      data: null,
      message: 'Unauthorized',
      errors: [],
      statusCode: HttpStatusCode.UNAUTHORIZED,
      messages: [],
      exception: '',
      errorId: '',
    } as IResponseData<null>);
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    ( req as any).id = decoded.id; 
    next();
  } catch (error) {
    return res.status(HttpStatusCode.FORBIDDEN).json({
      data: null,
      message: 'Invalid or expired token',
      errors: [],
      statusCode: HttpStatusCode.FORBIDDEN,
      messages: [],
      exception: '',
      errorId: '',
    } as IResponseData<null>);
  }
};
