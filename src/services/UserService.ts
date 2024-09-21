import { User } from '../entities/User';
import { UserRepositoryInterface } from '../repositories/interfaces/UserRepositoryInterface';

export class UserService {
    private userRepository: UserRepositoryInterface;

    constructor(userRepository: UserRepositoryInterface) {
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
