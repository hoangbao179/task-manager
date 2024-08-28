import { AppDataSource } from "../../config/data-source";
import { IUserService } from "./iuser.service";
import { User } from "../../entities/user";

class UserService implements IUserService {

  private userRepository = AppDataSource.getRepository(User);

  async getUserById(userId: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id: userId });
  }

  async createUser(userData: User): Promise<User> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }


  async updateUser(userId: string, user: Partial<User>): Promise<User | null> {
    await this.userRepository.update(userId, user);
    return await this.getUserById(userId);
  }

  async deleteUser(userId: string): Promise<any> {
    await this.userRepository.delete(userId);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
}

export default UserService;
