import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { IUser } from 'models/user/IUser.model';

const authService = new AuthService();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password);
    res.json({ data: { token }, message: 'Login success', statusCode: 200, errors: [] });
  } catch (error) {
    res.status(401).json({ message:  error.message, statusCode: 401, errors: [{ propertyName: 'email', errorMessage: error.message }] });
  }
};

export const register = async (req: Request, res: Response) => {
  const { fullName, email, password }: IUser = req.body;

  try {
    const user = await authService.register({ fullName, email, password });
    res.json({ data: user, message: 'Register success', statusCode: 201, errors: [] });
  } catch (error) {
    res.status(400).json({ message: 'Register fail', statusCode: 400, errors: [{ propertyName: 'email', errorMessage: error.message }] });
  }
};
