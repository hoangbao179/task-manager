import { Request, Response } from 'express';
import { UserService } from '../services/userService';
const userService = new UserService();

export class AuthController {
  static async login(req: Request, res: Response): Promise<Response> {
    try {
      const { userName, password } = req.body;
      const user = await userService.getUserById(userName); 
      if (user && await userService.comparePassword(password, user.password)) {
        return res.status(200).json({ message: 'Login successful' });
      }
      return res.status(401).json({ message: 'Invalid credentials' });
    } catch (error) {
      return res.status(500).json({ message: 'Login failed', error });
    }
  }
}
