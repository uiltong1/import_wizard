import { User } from "../../entities/User";

export interface UserRepositoryInterface {
    findOneById(userId: number): Promise<User | null>;
    createUser(userData: Partial<User>): Promise<User>;
}
