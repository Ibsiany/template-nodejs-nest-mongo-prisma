import { Test, TestingModule } from '@nestjs/testing';
import { CardEntityInterface } from '../../../interfaces/card-entity.interface';
import { CardRepository } from '../../../repositories/card.repository';
import { DeleteCardUseCase } from '../delete-card.usecase';

describe('Delete card UseCase', () => {
  let deleteCardUseCase: DeleteCardUseCase, repository: CardRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteCardUseCase,
        {
          provide: CardRepository,
          useValue: {
            findById: jest.fn(),
            deleteCard: jest.fn(),
          },
        },
      ],
    }).compile();

    deleteCardUseCase = module.get<DeleteCardUseCase>(DeleteCardUseCase);

    repository = await module.resolve<CardRepository>(CardRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(deleteCardUseCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('Should be able to delete card', async () => {
    const card = {
      id: '1',
      user_id: 'c36614aa-b41d-4b3a-b454-bed69f431ff5',
      description: 'Create card',
      status: '10',
      title: 'Card',
    } as CardEntityInterface;

    const findByIdSpy = jest
      .spyOn(repository, 'findById')
      .mockResolvedValueOnce(card);

    const deleteUserSpy = jest.spyOn(repository, 'deleteCard');

    await deleteCardUseCase.execute(card.id);

    expect(findByIdSpy).toHaveBeenCalledWith(card.id);
    expect(deleteUserSpy).toHaveBeenCalledWith(card);
  });
});
