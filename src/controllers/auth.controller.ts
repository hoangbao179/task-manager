import { HttpStatusCode } from "../enums/http.status";
import { IAuthService } from "../services/auth/iauth.service";
import { formatResponse } from "../utils/response.utils";
import { Request, Response } from 'express';

class AuthController {
  private authService: IAuthService;

  constructor(authService: IAuthService) {
      this.authService = authService;
  }

  login = async (req: Request, res: Response) : Promise<Response>  => {
    
    try {
      const token = await this.authService.login((req.body as any).email, (req.body as any).password);
      return res.status(HttpStatusCode.OK).json(formatResponse(token, ''));
    } catch (error) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json(formatResponse(null, error.message));
    }
  };

 register = async (req: Request, res: Response): Promise<Response>  => {
    try {
      const user = await this.authService.register(req.body as any);
      return res.status(HttpStatusCode.CREATED).json(formatResponse(user, ''));
    } catch (error) {
      return res.status(HttpStatusCode.BAD_REQUEST).json(formatResponse(null, "Register fail"));
    }
  };
}

export default AuthController;