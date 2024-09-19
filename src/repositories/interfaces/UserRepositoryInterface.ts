import { User } from "../../entities/User";

export interface IUserRepository {
    findOneById(userId: number): Promise<User | null>;
    createUser(userData: Partial<User>): Promise<User>;
}
