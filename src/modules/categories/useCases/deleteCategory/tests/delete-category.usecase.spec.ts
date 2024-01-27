import { Test, TestingModule } from '@nestjs/testing';
import { CategoryEntityInterface } from '../../../interfaces/category-entity.interface';
import { CategoryRepository } from '../../../repositories/category.repository';
import { DeleteCategoryUseCase } from '../delete-category.usecase';

describe('Delete category UseCase', () => {
  let deleteCategoryUseCase: DeleteCategoryUseCase,
    repositoryCategory: CategoryRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteCategoryUseCase,
        {
          provide: CategoryRepository,
          useValue: {
            findById: jest.fn(),
            deleteCategory: jest.fn(),
          },
        },
      ],
    }).compile();

    deleteCategoryUseCase = module.get<DeleteCategoryUseCase>(
      DeleteCategoryUseCase,
    );

    repositoryCategory =
      await module.resolve<CategoryRepository>(CategoryRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(deleteCategoryUseCase).toBeDefined();
    expect(repositoryCategory).toBeDefined();
  });

  it('Should be able to delete category', async () => {
    const category = {
      id: '1',
      user_id: 'uuid',
      name: 'Test category',
    } as CategoryEntityInterface;

    const findByIdCategorySpy = jest
      .spyOn(repositoryCategory, 'findById')
      .mockResolvedValueOnce(category);

    const deleteCategorySpy = jest
      .spyOn(repositoryCategory, 'deleteCategory')
      .mockResolvedValueOnce();

    await deleteCategoryUseCase.execute(category.id);

    expect(findByIdCategorySpy).toHaveBeenCalledWith(category.id);
    expect(deleteCategorySpy).toHaveBeenCalledWith(category);
  });
});
