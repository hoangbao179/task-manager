import { User } from "../../entities/user";

export interface IUserService {
    getUserById(userId: string): Promise<User | null>;

    createUser(user: User): Promise<User>;

    updateUser(userId: string, user: Partial<User>): Promise<User | null>;

    deleteUser(userId: string): Promise<number>;

    getAllUsers(): Promise<User[]>;
    
    getUserByEmail(email: string): Promise<User | null>;
}
