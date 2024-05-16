import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { CardRepository } from '../../../repositories/card.repository';
import { FindAllCardsRequestDTO } from '../dtos/request/get-cards-request.dto';
import { GetCardsController } from '../get-cards.controller';
import { GetCardsUseCase } from '../get-cards.usecase';

describe('Get cards Controller', () => {
  let app: INestApplication;
  let getCardsUseCase: GetCardsUseCase;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [GetCardsController],
      providers: [
        GetCardsUseCase,
        {
          provide: CardRepository,
          useValue: {},
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    getCardsUseCase = moduleRef.get<GetCardsUseCase>(GetCardsUseCase);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  it('should be defined', async () => {
    expect(getCardsUseCase).toBeDefined();
  });

  it('Should be able to get cards and return status 200', async () => {
    const card = { title: 'Test card' } as FindAllCardsRequestDTO;

    const createCardUseCaseSpy = jest
      .spyOn(getCardsUseCase, 'execute')
      .mockResolvedValueOnce([]);

    const result = await request(app.getHttpServer())
      .get('/card/c36614aa-b41d-4b3a-b454-bed69f431ff5')
      .send(card)
      .expect(HttpStatus.OK);

    expect(result.body).toEqual([]);
    expect(createCardUseCaseSpy).toHaveBeenCalled();
  });
});
