import { Test, TestingModule } from '@nestjs/testing';
import { CategoryEntityInterface } from '../../../interfaces/category-entity.interface';
import { CategoryRepository } from '../../../repositories/category.repository';
import { GetCategoriesUseCase } from '../get-categories.usecase';

describe('Get categories UseCase', () => {
  let getCategoriesUseCase: GetCategoriesUseCase,
    repositoryCategory: CategoryRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetCategoriesUseCase,
        {
          provide: CategoryRepository,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    getCategoriesUseCase =
      module.get<GetCategoriesUseCase>(GetCategoriesUseCase);

    repositoryCategory =
      await module.resolve<CategoryRepository>(CategoryRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(getCategoriesUseCase).toBeDefined();
    expect(repositoryCategory).toBeDefined();
  });

  it('Should be able to get categories', async () => {
    const category = [
      {
        id: '2',
        user_id: 'uuid',
        name: 'Test category',
      } as CategoryEntityInterface,
    ];

    const findByIdUserSpy = jest
      .spyOn(repositoryCategory, 'findAll')
      .mockResolvedValueOnce(category);

    const result = await getCategoriesUseCase.execute('uuid', 'Test category');

    expect(result).toEqual(category);
    expect(findByIdUserSpy).toHaveBeenCalledWith('uuid', 'Test category');
  });
});
