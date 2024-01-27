import { Test, TestingModule } from '@nestjs/testing';
import { CategoryRepository } from '../../../../categories/repositories/category.repository';
import { CardRepository } from '../../../repositories/card.repository';
import { UpdateCardUseCase } from '../update-card.usecase';

describe('Update card UseCase', () => {
  let updateCardUseCase: UpdateCardUseCase,
    repositoryCard: CardRepository,
    repositoryCategory: CategoryRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateCardUseCase,
        {
          provide: CardRepository,
          useValue: {
            findById: jest.fn(),
            updateAndSave: jest.fn(),
          },
        },
        {
          provide: CategoryRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    updateCardUseCase = module.get<UpdateCardUseCase>(UpdateCardUseCase);

    repositoryCard = await module.resolve<CardRepository>(CardRepository);

    repositoryCategory =
      await module.resolve<CategoryRepository>(CategoryRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(updateCardUseCase).toBeDefined();
    expect(repositoryCard).toBeDefined();
    expect(repositoryCategory).toBeDefined();
  });
});
