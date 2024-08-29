import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { IUserService } from '../../services/user/iuser.service';
import { IUser } from '../../models/user/IUser.model';
import { User } from '../../entities/user';
import { IAuthService } from './iauth.service';

class AuthService implements IAuthService {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '72h' });
    return token;
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
}

export default AuthService;
