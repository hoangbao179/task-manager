import { ITokenPayload } from "models/token/ITokenPayLoad";
import { HttpStatusCode } from "../enums/http.status";
import { IAuthService } from "../services/auth/auth.interface";
import { formatResponse } from "../utils/response.utils";
import { ILoginRequest, IUser } from "../models/user/IUser.model";
import { IUserService } from "../services/user/user.interface";
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
export class AuthController {
  private authService: IAuthService;
  private userService: IUserService;

  constructor(authService: IAuthService, userService: IUserService) {
      this.authService = authService;
      this.userService = userService;
  }

  login = async (req: Request, res: Response) : Promise<Response>  => {
    try {
      const token = await this.authService.login(req.body as ILoginRequest);
      return res.status(HttpStatusCode.OK).json(formatResponse(token, ''));
    } catch (error) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json(formatResponse(null, error.message));
    }
  };

 register = async (req: Request, res: Response): Promise<Response>  => {
    try {
      const user = await this.authService.register(req.body as IUser);
      return res.status(HttpStatusCode.CREATED).json(formatResponse(user, ''));
    } catch (error) {
      return res.status(HttpStatusCode.BAD_REQUEST).json(formatResponse(null, "Register fail"));
    }
  };

  refreshToken = async (req: Request, res: Response): Promise<Response> => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(HttpStatusCode.BAD_REQUEST).json(formatResponse(null, 'No refresh token'));
    }
    
    try {
      const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as ITokenPayload;
      const user = await this.userService.getUserById(payload.userId);
      if (!user) {
        throw new Error('User not found');
      }
      const accessToken = this.authService.generateAccessToken(user);
      return res.status(HttpStatusCode.OK).json(formatResponse({ accessToken }, ''));
    } catch (error) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json(formatResponse(null, 'Refresh token not valid'));
    }
  };
}
