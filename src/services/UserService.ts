import { User } from '../entities/User';
import { IUserRepository } from '../repositories/interfaces/UserRepositoryInterface';

export class UserService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    public async findOrCreateUser(userId: number, userName: string): Promise<User> {
        let user = await this.userRepository.findOneById(userId);
        if (!user) {
            user = await this.userRepository.createUser({ id: userId, name: userName });
        }
        return user;
    }
}
