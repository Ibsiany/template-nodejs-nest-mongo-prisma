import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../../repositories/user.repository';
import { SessionUseCase } from '../session.usecase';

describe('Delete user UseCase', () => {
  let sessionUseCase: SessionUseCase, repository: UserRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionUseCase,
        {
          provide: UserRepository,
          useValue: {
            findByEmail: jest.fn(),
            createAndSave: jest.fn(),
          },
        },
      ],
    }).compile();

    sessionUseCase = module.get<SessionUseCase>(SessionUseCase);

    repository = await module.resolve<UserRepository>(UserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(sessionUseCase).toBeDefined();
    expect(repository).toBeDefined();
  });
});
