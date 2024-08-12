import { AppDataSource } from '../config/data-source';
import { User } from '../entities/user';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  async getUserById(userId: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id: userId });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async updateUser(userId: string, updateData: Partial<User>): Promise<User | null> {
    await this.userRepository.update(userId, updateData);
    return await this.getUserById(userId);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.userRepository.delete(userId);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
