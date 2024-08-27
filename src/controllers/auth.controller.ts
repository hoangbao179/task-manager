import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { IUser } from 'models/user/IUser.model';
import { HttpStatusCode } from '../enums/http.status';
import { formatResponse } from '../utils/response.utils';

const authService = new AuthService();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password);
    return res.status(HttpStatusCode.OK).json(formatResponse(token, ''));
  } catch (error) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json(formatResponse(null, error.message));
  }
};

export const register = async (req: Request, res: Response) => {
  const { fullName, email, password }: IUser = req.body;

  try {
    const user = await authService.register({ fullName, email, password });
    return res.status(HttpStatusCode.CREATED).json(formatResponse(user, ''));
  } catch (error) {
    return res.status(HttpStatusCode.BAD_REQUEST).json(formatResponse(null, "Register fail"));
  }
};
