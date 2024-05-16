import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { CardRepository } from '../../../../cards/repositories/card.repository';
import { CategoryRepository } from '../../../../categories/repositories/category.repository';
import { UserRepository } from '../../../repositories/user.repository';
import { DeleteUserController } from '../delete-user.controller';
import { DeleteUserUseCase } from '../delete-user.usecase';

describe('Delete user Controller', () => {
  let app: INestApplication;
  let deleteUserUseCase: DeleteUserUseCase;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [DeleteUserController],
      providers: [
        DeleteUserUseCase,
        {
          provide: UserRepository,
          useValue: {},
        },
        {
          provide: CategoryRepository,
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

    deleteUserUseCase = moduleRef.get<DeleteUserUseCase>(DeleteUserUseCase);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  it('should be defined', async () => {
    expect(deleteUserUseCase).toBeDefined();
  });

  it('Should be able to delete user and return status 204', async () => {
    const deleteUserUseCaseSpy = jest
      .spyOn(deleteUserUseCase, 'execute')
      .mockResolvedValueOnce();

    await request(app.getHttpServer())
      .delete('/user/c36614aa-b41d-4b3a-b454-bed69f431ff5')
      .expect(HttpStatus.NO_CONTENT);

    expect(deleteUserUseCaseSpy).toHaveBeenCalled();
  });
});
