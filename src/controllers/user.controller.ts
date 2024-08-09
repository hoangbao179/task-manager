import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { IUser } from '../models/user';
import { HttpStatusCode } from '../enums/http.status';
import { formatResponse } from '../utils/response.utils';

const userService = new UserService();

export class UserController {
  static async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const userData: IUser = req.body;
      const user = await userService.createUser(userData);
      return res.status(HttpStatusCode.CREATED).json(formatResponse(user, 'User created successfully'));
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(formatResponse(null, 'Failed to create user', [], HttpStatusCode.INTERNAL_SERVER_ERROR));
    }
  }

  static async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.id;
      const user = await userService.getUserById(userId);
      if (user) {
        return res.status(HttpStatusCode.OK).json(formatResponse(user, 'User retrieved successfully'));
      }
      return res.status(HttpStatusCode.NOT_FOUND).json(formatResponse(null, 'User not found', [], HttpStatusCode.NOT_FOUND));
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(formatResponse(null, 'Failed to retrieve user', [], HttpStatusCode.INTERNAL_SERVER_ERROR));
    }
  }

  static async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.id;
      const updateData: Partial<IUser> = req.body;
      const updatedUser = await userService.updateUser(userId, updateData);
      if (updatedUser) {
        return res.status(HttpStatusCode.OK).json(formatResponse(updatedUser, 'User updated successfully'));
      }
      return res.status(HttpStatusCode.NOT_FOUND).json(formatResponse(null, 'User not found', [], HttpStatusCode.NOT_FOUND));
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(formatResponse(null, 'Failed to update user', [], HttpStatusCode.INTERNAL_SERVER_ERROR));
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.id;
      await userService.deleteUser(userId);
      return res.status(HttpStatusCode.NO_CONTENT).send();
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(formatResponse(null, 'Failed to delete user', [], HttpStatusCode.INTERNAL_SERVER_ERROR));
    }
  }
}
