import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { User } from '../entities/user';
import { HttpStatusCode } from '../enums/http.status';
import { formatResponse } from '../utils/response.utils';

const userService = new UserService();

export class UserController {
  static async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const userData: Partial<User> = req.body;
      const user = await userService.createUser(userData);
      return res.status(HttpStatusCode.CREATED).json(user);
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to create user', error: error.message });
    }
  }

  static async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.id;
      const user = await userService.getUserById(userId);
      if (user) {
        return res.status(HttpStatusCode.OK).json(user);
      }
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'User not found' });
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to retrieve user', error: error.message });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.id;
      const updateData: Partial<User> = req.body;
      const updatedUser = await userService.updateUser(userId, updateData);
      if (updatedUser) {
        return res.status(HttpStatusCode.OK).json(updatedUser);
      }
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'User not found' });
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to update user', error: error.message });
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.id;
      await userService.deleteUser(userId);
      return res.status(HttpStatusCode.NO_CONTENT).send(); 
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to delete user', error: error.message });
    }
  }

  static async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await userService.getAllUsers();
      return res.status(HttpStatusCode.OK).json(users);
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to retrieve users', error: error.message });
    }
  }

  static async getCurrentUser (req: Request, res: Response): Promise<Response> {
    try {
      const user = await userService.getUserById((req as any).id);
  
      if (!user) {
        return res.status(HttpStatusCode.NOT_FOUND).json(formatResponse(null, "user not found", [], HttpStatusCode.NOT_FOUND));
      }
  
      const userInfo = {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      };
  
      return res.status(HttpStatusCode.OK).json(formatResponse(userInfo, 'User info retrieved successfully'));
    } catch (error) {
      return res.status(500).json(formatResponse(null, 'Internal server error'));
    }
  };
}
