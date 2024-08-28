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
      return res.status(HttpStatusCode.CREATED).json(formatResponse(user, ''));
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(formatResponse( null, 'Failed to create user'));
    }
  }

  static async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.userId;
      const user = await userService.getUserById(userId);
      if (user) {
        return res.status(HttpStatusCode.OK).json(formatResponse(user, ''));
      }
      return res.status(HttpStatusCode.NOT_FOUND).json(formatResponse( null, 'User not found'));
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(formatResponse( null, 'Failed to retrieve user'));
    }
  }

  static async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.userId;
      const updateData: Partial<User> = req.body;
      const updatedUser = await userService.updateUser(userId, updateData);
      if (updatedUser) {
        return res.status(HttpStatusCode.OK).json(formatResponse(updatedUser, ''));
      }
      return res.status(HttpStatusCode.NOT_FOUND).json(formatResponse( null, 'User not found'));

    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(formatResponse( null, 'Failed to update user'));
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.userId;
      await userService.deleteUser(userId);
      return res.status(HttpStatusCode.NO_CONTENT).send(); 
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(formatResponse(null, 'Failed to delete user'));
    }
  }

  static async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await userService.getAllUsers();
      return res.status(HttpStatusCode.OK).json(formatResponse(users, ''));
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(formatResponse(null, 'Failed to retrieve users'));
    }
  }

  static async getCurrentUser (req: Request, res: Response): Promise<Response> {
    try {
      const user = await userService.getUserById((req as any).userId);
  
      if (!user) {
        return res.status(HttpStatusCode.NOT_FOUND).json(formatResponse(null, "user not found", [], HttpStatusCode.NOT_FOUND));
      }
  
      return res.status(HttpStatusCode.OK).json(formatResponse(user, 'User info retrieved successfully'));
    } catch (error) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(formatResponse(null, 'Internal server error'));
    }
  };
}
