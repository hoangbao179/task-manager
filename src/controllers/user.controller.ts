import { Request, Response } from 'express';
import { User } from '../entities/user';
import { HttpStatusCode } from '../enums/http.status';
import { formatResponse } from '../utils/response.utils';
import { IUserService } from '../services/user/iuser.service';

class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
      this.userService = userService;
  }
   createUser = async (req: Request, res: Response): Promise<Response> =>  {
    try {
      const userData: User = req.body;
      const user = await this.userService.createUser(userData);
      return res.status(HttpStatusCode.CREATED).json(formatResponse(user, ''));
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(formatResponse(null, 'Failed to create user'));
    }
  }

   getUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req.params.userId;
      const user = await this.userService.getUserById(userId);
      if (user) {
        return res.status(HttpStatusCode.OK).json(formatResponse(user, ''));
      }
      return res.status(HttpStatusCode.NOT_FOUND).json(formatResponse(null, 'User not found'));
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(formatResponse(null, 'Failed to retrieve user'));
    }
  }

   updateUser = async (req: Request, res: Response): Promise<Response> =>  {
    try {
      const userId = req.params.userId;
      const updateData: Partial<User> = req.body;
      const updatedUser = await this.userService.updateUser(userId, updateData);
      if (updatedUser) {
        return res.status(HttpStatusCode.OK).json(formatResponse(updatedUser, ''));
      }
      return res.status(HttpStatusCode.NOT_FOUND).json(formatResponse(null, 'User not found'));

    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(formatResponse(null, 'Failed to update user'));
    }
  }

  deleteUser = async(req: Request, res: Response): Promise<Response> =>  {
    try {
      const userId = req.params.userId;
      await this.userService.deleteUser(userId);
      return res.status(HttpStatusCode.NO_CONTENT).send();
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(formatResponse(null, 'Failed to delete user'));
    }
  }

  getAllUsers = async(req: Request, res: Response): Promise<Response> =>  {
    try {
      const users = await this.userService.getAllUsers();
      return res.status(HttpStatusCode.OK).json(formatResponse(users, ''));
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(formatResponse(null, 'Failed to retrieve users'));
    }
  }

  getCurrentUser = async(req: Request, res: Response): Promise<Response> =>  {
    try {
      const user = await this.userService.getUserById((req as any).userId);

      if (!user) {
        return res.status(HttpStatusCode.NOT_FOUND).json(formatResponse(null, "user not found", [], HttpStatusCode.NOT_FOUND));
      }

      return res.status(HttpStatusCode.OK).json(formatResponse(user, 'User info retrieved successfully'));
    } catch (error) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(formatResponse(null, 'Internal server error'));
    }
  };
}

export default UserController;
