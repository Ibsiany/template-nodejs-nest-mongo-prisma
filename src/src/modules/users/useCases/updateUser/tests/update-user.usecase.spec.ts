import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../../repositories/user.repository';
import { UpdateUserUseCase } from '../update-user.usecase';

describe('Update user UseCase', () => {
  let updateUserUseCase: UpdateUserUseCase, repository: UserRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserUseCase,
        {
          provide: UserRepository,
          useValue: {
            findById: jest.fn(),
            updateAndSave: jest.fn(),
          },
        },
      ],
    }).compile();

    updateUserUseCase = module.get<UpdateUserUseCase>(UpdateUserUseCase);

    repository = await module.resolve<UserRepository>(UserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(updateUserUseCase).toBeDefined();
    expect(repository).toBeDefined();
  });
});
