import { injectable } from 'inversify';
import { AppDataSource } from '../database/dataSource';
import { User } from '../entities/User';
import { UserRepositoryInterface } from './interfaces/UserRepositoryInterface';

@injectable()
export class UserRepository implements UserRepositoryInterface {
    private userRepository = AppDataSource.getRepository(User);

    public async findOneById(userId: number): Promise<User | null> {
        return await this.userRepository.findOneBy({ id: userId });
    }

    public async createUser(userData: Partial<User>): Promise<User> {
        const user = this.userRepository.create(userData);
        return await this.userRepository.save(user);
    }
}
