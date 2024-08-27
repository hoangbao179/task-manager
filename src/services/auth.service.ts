import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../entities/user';

import { UserService } from './user.service';
import { IUser } from 'models/user/IUser.model';

export class AuthService {
  private userService = new UserService();

  async login(email: string, password: string): Promise<string> {
    const user = await this.userService.getUserByEmail(email);
    if (!user || !(bcrypt.compare(password, user.password))) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ id: user.id, email: user.email, fullName: user.fullName }, process.env.JWT_SECRET!, { expiresIn: '72h' });
    return token;
  }
  async register(userData: IUser): Promise<User> {
    const existingUser = await this.userService.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new User();
    newUser.fullName = userData.fullName;
    newUser.email = userData.email;
    newUser.password = hashedPassword;

    const createdUser = await this.userService.createUser(newUser);
    return createdUser;
  }
}
