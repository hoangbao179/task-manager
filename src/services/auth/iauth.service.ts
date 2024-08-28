import { User } from "../../entities/user";
import { IUser } from "../../models/user/IUser.model";

export interface IAuthService {
    login(email: string, password: string): Promise<string>;

    register(userData: IUser): Promise<User>;
}
