import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { UserRepository } from '../../../../users/repositories/user.repository';
import { CardEntityInterface } from '../../../interfaces/card-entity.interface';
import { CardRepository } from '../../../repositories/card.repository';
import { CreateCardController } from '../create-card.controller';
import { CreateCardUseCase } from '../create-card.usecase';
import { CreateCardDTO } from '../dtos/request/create-card-request.dto';

describe('Create card Controller', () => {
  let app: INestApplication;
  let createCardUseCase: CreateCardUseCase;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CreateCardController],
      providers: [
        CreateCardUseCase,
        {
          provide: UserRepository,
          useValue: {},
        },
        {
          provide: CardRepository,
          useValue: {},
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    createCardUseCase = moduleRef.get<CreateCardUseCase>(CreateCardUseCase);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  it('should be defined', async () => {
    expect(createCardUseCase).toBeDefined();
  });

  it('Should be able to create card and return status 201', async () => {
    const card = {
      user_id: 'c36614aa-b41d-4b3a-b454-bed69f431ff5',
      description: 'Create card',
      status: '10',
      title: 'Card',
    } as CreateCardDTO;

    const mockResponse = {} as CardEntityInterface;

    const createUserUseCaseSpy = jest
      .spyOn(createCardUseCase, 'execute')
      .mockResolvedValueOnce(mockResponse);

    const result = await request(app.getHttpServer())
      .post('/card/c36614aa-b41d-4b3a-b454-bed69f431ff5')
      .send(card)
      .expect(HttpStatus.CREATED);

    expect(result.body).toEqual(mockResponse);
    expect(createUserUseCaseSpy).toHaveBeenCalledWith(card);
  });
});
