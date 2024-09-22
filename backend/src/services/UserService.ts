import { inject, injectable } from 'inversify';
import { User } from '../entities/User';
import { UserRepositoryInterface } from '../repositories/interfaces/UserRepositoryInterface';
import { TYPES } from '../types/types';

@injectable()
export class UserService {
    constructor(@inject(TYPES.UserRepository) private userRepository: UserRepositoryInterface) {
    }

    public async findOrCreateUser(userId: number, userName: string): Promise<User> {
        let user = await this.userRepository.findOneById(userId);
        if (!user) {
            user = await this.userRepository.createUser({ id: userId, name: userName });
        }
        return user;
    }
}
