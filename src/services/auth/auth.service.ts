import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { IUserService } from '../user/user.interface';
import { ILoginRequest, IUser } from '../../models/user/IUser.model';
import { User } from '../../entities/user';
import { IAuthService } from './auth.interface';

export class AuthService implements IAuthService {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async login(req: ILoginRequest): Promise<any> {
    const user = await this.userService.getUserByEmail(req.email);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(req.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return { accessToken, refreshToken };

  }

  async register(userData: IUser): Promise<User> {
    const existingUser = await this.userService.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new User();
    newUser.lastName = userData.lastName;
    newUser.firstName = userData.firstName
    newUser.email = userData.email;
    newUser.password = hashedPassword;
    const createdUser = await this.userService.createUser(newUser);
    return createdUser;
  }
  
  async generateAccessToken(user: User): Promise<string> {
    return jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '4h' });
  }

  async generateRefreshToken(user: User): Promise<string>  {
    return jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });
  }

}
