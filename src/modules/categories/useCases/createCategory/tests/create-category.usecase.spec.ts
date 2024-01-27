import { Test, TestingModule } from '@nestjs/testing';
import { UserEntityInterface } from '../../../../users/interfaces/user-entity.interface';
import { UserRepository } from '../../../../users/repositories/user.repository';
import { CategoryEntityInterface } from '../../../interfaces/category-entity.interface';
import { CategoryRepository } from '../../../repositories/category.repository';
import { CreateCategoryUseCase } from '../create-category.usecase';

describe('Create category UseCase', () => {
  let createCategoryUseCase: CreateCategoryUseCase,
    repositoryCategory: CategoryRepository,
    repositoryUser: UserRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCategoryUseCase,
        {
          provide: CategoryRepository,
          useValue: {
            createAndSave: jest.fn(),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    createCategoryUseCase = module.get<CreateCategoryUseCase>(
      CreateCategoryUseCase,
    );

    repositoryCategory =
      await module.resolve<CategoryRepository>(CategoryRepository);

    repositoryUser = await module.resolve<UserRepository>(UserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(createCategoryUseCase).toBeDefined();
    expect(repositoryCategory).toBeDefined();
    expect(repositoryUser).toBeDefined();
  });

  it('Should be able to create category', async () => {
    const user = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      password: '******',
    } as UserEntityInterface;

    const category = {
      id: '2',
      user_id: user.id,
      name: 'Test category',
    } as CategoryEntityInterface;

    const findByIdUserSpy = jest
      .spyOn(repositoryUser, 'findById')
      .mockResolvedValueOnce(user);

    const createAndSaveCategorySpy = jest
      .spyOn(repositoryCategory, 'createAndSave')
      .mockResolvedValueOnce(category);

    const result = await createCategoryUseCase.execute(
      'Test category',
      user.id,
    );

    expect(result.id).toEqual(category.id);
    expect(findByIdUserSpy).toHaveBeenCalledWith(user.id);
    expect(createAndSaveCategorySpy).toHaveBeenCalled();
  });
});
