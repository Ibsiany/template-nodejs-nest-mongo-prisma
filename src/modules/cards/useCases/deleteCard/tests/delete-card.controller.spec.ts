import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { UserRepository } from '../../../../users/repositories/user.repository';
import { CardRepository } from '../../../repositories/card.repository';
import { DeleteCardController } from '../delete-card.controller';
import { DeleteCardUseCase } from '../delete-card.usecase';

describe('Delete card Controller', () => {
  let app: INestApplication;
  let deleteCardUseCase: DeleteCardUseCase;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [DeleteCardController],
      providers: [
        DeleteCardUseCase,
        {
          provide: CardRepository,
          useValue: {},
        },
        {
          provide: UserRepository,
          useValue: {},
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    deleteCardUseCase = moduleRef.get<DeleteCardUseCase>(DeleteCardUseCase);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  it('should be defined', async () => {
    expect(deleteCardUseCase).toBeDefined();
  });

  it('Should be able to delete card and return status 204', async () => {
    const deleteCardUseCaseSpy = jest
      .spyOn(deleteCardUseCase, 'execute')
      .mockResolvedValueOnce();

    await request(app.getHttpServer())
      .delete('/card/c36614aa-b41d-4b3a-b454-bed69f431ff5')
      .expect(HttpStatus.NO_CONTENT);

    expect(deleteCardUseCaseSpy).toHaveBeenCalled();
  });
});
