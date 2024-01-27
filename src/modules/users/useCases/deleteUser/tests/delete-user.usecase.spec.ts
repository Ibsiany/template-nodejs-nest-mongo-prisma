import { Test, TestingModule } from '@nestjs/testing';
import { CardEntityInterface } from '../../../../cards/interfaces/card-entity.interface';
import { CardRepository } from '../../../../cards/repositories/card.repository';
import { CategoryEntityInterface } from '../../../../categories/interfaces/category-entity.interface';
import { CategoryRepository } from '../../../../categories/repositories/category.repository';
import { UserEntityInterface } from '../../../interfaces/user-entity.interface';
import { UserRepository } from '../../../repositories/user.repository';
import { DeleteUserUseCase } from '../delete-user.usecase';

describe('Delete user UseCase', () => {
  let deleteUserUseCase: DeleteUserUseCase,
    repositoryCard: CardRepository,
    repositoryCategory: CategoryRepository,
    repositoryUser: UserRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserUseCase,
        {
          provide: UserRepository,
          useValue: {
            findById: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
        {
          provide: CategoryRepository,
          useValue: {
            findAll: jest.fn(),
            deleteCategory: jest.fn(),
          },
        },
        {
          provide: CardRepository,
          useValue: {
            findAll: jest.fn(),
            deleteCard: jest.fn(),
          },
        },
      ],
    }).compile();

    deleteUserUseCase = module.get<DeleteUserUseCase>(DeleteUserUseCase);

    repositoryUser = await module.resolve<UserRepository>(UserRepository);

    repositoryCategory =
      await module.resolve<CategoryRepository>(CategoryRepository);

    repositoryCard = await module.resolve<CardRepository>(CardRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(deleteUserUseCase).toBeDefined();
    expect(repositoryCard).toBeDefined();
    expect(repositoryCategory).toBeDefined();
    expect(repositoryUser).toBeDefined();
  });

  it('Should be able to delete user', async () => {
    const user = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      password: '******',
    } as UserEntityInterface;

    const findAllCardsSpy = jest
      .spyOn(repositoryCard, 'findAll')
      .mockResolvedValueOnce([{} as CardEntityInterface]);

    const deleteCardSpy = jest.spyOn(repositoryCard, 'deleteCard');

    const findAllCategorysSpy = jest
      .spyOn(repositoryCategory, 'findAll')
      .mockResolvedValueOnce([{} as CategoryEntityInterface]);

    const deleteCategorySpy = jest.spyOn(repositoryCategory, 'deleteCategory');

    const findUserSpy = jest
      .spyOn(repositoryUser, 'findById')
      .mockResolvedValueOnce(user);

    const deleteUserSpy = jest.spyOn(repositoryUser, 'deleteUser');

    await deleteUserUseCase.execute('1');

    expect(findAllCardsSpy).toHaveBeenCalled();
    expect(deleteCardSpy).toHaveBeenCalled();
    expect(findAllCategorysSpy).toHaveBeenCalled();
    expect(deleteCategorySpy).toHaveBeenCalled();
    expect(findUserSpy).toHaveBeenCalled();
    expect(deleteUserSpy).toHaveBeenCalledWith(user);
  });
});
