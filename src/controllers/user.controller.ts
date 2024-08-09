import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { IUser } from '../models/user';

const userService = new UserService();

export class UserController {
  static async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const userData: IUser = req.body;
      const user = await userService.createUser(userData);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to create user', error });
    }
  }

  static async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.id;
      const user = await userService.getUserById(userId);
      if (user) {
        return res.status(200).json(user);
      }
      return res.status(404).json({ message: 'User not found' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to retrieve user', error });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.id;
      const updateData: Partial<IUser> = req.body;
      const updatedUser = await userService.updateUser(userId, updateData);
      if (updatedUser) {
        return res.status(200).json(updatedUser);
      }
      return res.status(404).json({ message: 'User not found' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to update user', error });
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.id;
      await userService.deleteUser(userId);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Failed to delete user', error });
    }
  }
}
