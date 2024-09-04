import { User } from "../../entities/user";
import { ILoginRequest, IUser } from "../../models/user/IUser.model";

export interface IAuthService {
    login(req: ILoginRequest): Promise<string>;

    register(userData: IUser): Promise<User>;

    generateAccessToken(user: User): Promise<string>;  

    generateRefreshToken(user: User): Promise<string>;
}
