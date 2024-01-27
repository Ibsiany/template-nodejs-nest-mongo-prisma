import { Test, TestingModule } from '@nestjs/testing';
import { UserEntityInterface } from '../../../interfaces/user-entity.interface';
import { UserRepository } from '../../../repositories/user.repository';
import { GetUserByIdUseCase } from '../get-user-by-id.usecase';

describe('Delete user UseCase', () => {
  let getUserByIdUseCase: GetUserByIdUseCase, repository: UserRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserByIdUseCase,
        {
          provide: UserRepository,
          useValue: {
            findById: jest.fn(),
            createAndSave: jest.fn(),
          },
        },
      ],
    }).compile();

    getUserByIdUseCase = module.get<GetUserByIdUseCase>(GetUserByIdUseCase);

    repository = await module.resolve<UserRepository>(UserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(getUserByIdUseCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('Should be able to get user', async () => {
    const user = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      password: '******',
    } as UserEntityInterface;

    const createAndSaveUserSpy = jest
      .spyOn(repository, 'findById')
      .mockResolvedValueOnce(user);

    await getUserByIdUseCase.execute('1');

    expect(createAndSaveUserSpy).toHaveBeenCalled();
  });
});
