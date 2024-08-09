
import bcrypt from 'bcrypt';
import User, { IUser } from '../models/user';

const SALT_ROUNDS = 10;

export class UserService {
  async createUser(userData: IUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
    const newUserData = { ...userData, password: hashedPassword };
    return User.create(newUserData);
  }

  async getUserById(id: string): Promise<User | null> {
    return User.findByPk(id);
  }

  async updateUser(id: string, updateData: Partial<IUser>): Promise<User | null> {
    const user = await User.findByPk(id);
    if (user) {
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, SALT_ROUNDS);
      }
      return user.update(updateData);
    }
    return null;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
    }
  }

  async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
