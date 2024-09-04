import { User } from "../../entities/user";
import { ILoginRequest, IUser } from "../../models/user/IUser.model";

export interface IAuthService {
    login(req: ILoginRequest): Promise<string>;

    register(userData: IUser): Promise<User>;
}
