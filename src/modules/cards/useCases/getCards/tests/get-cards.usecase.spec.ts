import { Test, TestingModule } from '@nestjs/testing';
import { FindAllCardsDTO } from '../../../dtos/request/find-all-cards-request.dto';
import { CardEntityInterface } from '../../../interfaces/card-entity.interface';
import { CardRepository } from '../../../repositories/card.repository';
import { GetCardsUseCase } from '../get-cards.usecase';

describe('Create user UseCase', () => {
  let getCardsUseCase: GetCardsUseCase, repository: CardRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetCardsUseCase,
        {
          provide: CardRepository,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    getCardsUseCase = module.get<GetCardsUseCase>(GetCardsUseCase);

    repository = await module.resolve<CardRepository>(CardRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(getCardsUseCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('Should be able to get cards', async () => {
    const card = [
      {
        id: '2',
        user_id: 'uuid',
        title: 'Test category',
      } as CardEntityInterface,
    ];

    const findByIdUserSpy = jest
      .spyOn(repository, 'findAll')
      .mockResolvedValueOnce(card);

    const query = {
      user_id: 'uuid',
    } as FindAllCardsDTO;

    const result = await getCardsUseCase.execute(query);

    expect(result).toEqual(card);
    expect(findByIdUserSpy).toHaveBeenCalledWith(query);
  });
});
