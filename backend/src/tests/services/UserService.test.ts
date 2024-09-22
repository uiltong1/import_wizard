import { User } from "../../entities/User";
import { UserRepositoryInterface } from "../../repositories/interfaces/UserRepositoryInterface";
import { UserService } from "../../services/UserService";

describe('UserService', () => {
    let userService: UserService;
    let userRepositoryMock: jest.Mocked<UserRepositoryInterface>;

    beforeEach(() => {
        userRepositoryMock = {
            findOneById: jest.fn(),
            createUser: jest.fn(),
        } as unknown as jest.Mocked<UserRepositoryInterface>;

        userService = new UserService(userRepositoryMock);
    });

    describe('findOrCreateUser', () => {
        it('deve retornar um usuário existente', async () => {
            const mockUser: User = { id: 1, name: 'John Doe', orders: [] }; 
            userRepositoryMock.findOneById.mockResolvedValue(mockUser);

            const result = await userService.findOrCreateUser(1, 'John Doe');

            expect(result).toEqual(mockUser);
            expect(userRepositoryMock.findOneById).toHaveBeenCalledWith(1);
            expect(userRepositoryMock.createUser).not.toHaveBeenCalled();
        });

        it('deve criar um novo usuário se não existir', async () => {
            userRepositoryMock.findOneById.mockResolvedValue(null); 
            const newUser: User = { id: 1, name: 'John Doe', orders: [] }; 
            userRepositoryMock.createUser.mockResolvedValue(newUser);

            const result = await userService.findOrCreateUser(1, 'John Doe');

            expect(result).toEqual(newUser);
            expect(userRepositoryMock.findOneById).toHaveBeenCalledWith(1);
            expect(userRepositoryMock.createUser).toHaveBeenCalledWith({ id: 1, name: 'John Doe' });
        });
    });
});
