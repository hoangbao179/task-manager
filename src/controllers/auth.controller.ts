import { TokenPayload } from "models/token/ITokenPayLoad";
import { HttpStatusCode } from "../enums/http.status";
import { IAuthService } from "../services/auth/auth.interface";
import { formatResponse } from "../utils/response.utils";
import { Request, Response } from 'express';
import { ILoginRequest, IUser } from "models/user/IUser.model";

export class AuthController {
  private authService: IAuthService;

  constructor(authService: IAuthService) {
      this.authService = authService;
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
}
