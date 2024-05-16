import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { UserEntityInterface } from '../../../interfaces/user-entity.interface';
import { UserRepository } from '../../../repositories/user.repository';
import { GetUserByIdController } from '../get-user-by-id.controller';
import { GetUserByIdUseCase } from '../get-user-by-id.usecase';

describe('Get user  by ID Controller', () => {
  let app: INestApplication;
  let getUserByIdUseCase: GetUserByIdUseCase;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [GetUserByIdController],
      providers: [
        GetUserByIdUseCase,
        {
          provide: UserRepository,
          useValue: {},
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    getUserByIdUseCase = moduleRef.get<GetUserByIdUseCase>(GetUserByIdUseCase);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  it('should be defined', async () => {
    expect(getUserByIdUseCase).toBeDefined();
  });

  it('Should be able to get user and return status 200', async () => {
    const mockResponse = {
      name: 'Test User',
      email: 'test@example.com',
      password: '******',
    } as UserEntityInterface;

    const getUserByIdUseCaseSpy = jest
      .spyOn(getUserByIdUseCase, 'execute')
      .mockResolvedValueOnce(mockResponse);

    const result = await request(app.getHttpServer())
      .get('/user/c36614aa-b41d-4b3a-b454-bed69f431ff5')
      .expect(HttpStatus.OK);

    expect(result.body).toEqual(mockResponse);
    expect(getUserByIdUseCaseSpy).toHaveBeenCalled();
  });
});
