import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { CategoryRepository } from '../../../../categories/repositories/category.repository';
import { CardEntityInterface } from '../../../interfaces/card-entity.interface';
import { CardRepository } from '../../../repositories/card.repository';
import { UpdateCardParamsRequestDTO } from '../dtos/request/update-card-params-request.dto copy';
import { UpdateCardController } from '../update-card.controller';
import { UpdateCardUseCase } from '../update-card.usecase';

describe('Update card Controller', () => {
  let app: INestApplication;
  let updateCardUseCase: UpdateCardUseCase;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UpdateCardController],
      providers: [
        UpdateCardUseCase,
        {
          provide: CardRepository,
          useValue: {},
        },
        {
          provide: CategoryRepository,
          useValue: {},
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    updateCardUseCase = moduleRef.get<UpdateCardUseCase>(UpdateCardUseCase);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  it('should be defined', async () => {
    expect(updateCardUseCase).toBeDefined();
  });

  it('Should be able to update card and return status 201', async () => {
    const card = {
      description: 'Test card',
    } as UpdateCardParamsRequestDTO;
    const mockResponse = {} as CardEntityInterface;

    const createUserUseCaseSpy = jest
      .spyOn(updateCardUseCase, 'execute')
      .mockResolvedValueOnce(mockResponse);

    const result = await request(app.getHttpServer())
      .patch('/card/c36614aa-b41d-4b3a-b454-bed69f431ff5')
      .send(card)
      .expect(HttpStatus.CREATED);

    expect(result.body).toEqual(mockResponse);
    expect(createUserUseCaseSpy).toHaveBeenCalledWith({
      ...card,
      id: 'c36614aa-b41d-4b3a-b454-bed69f431ff5',
    });
  });
});
