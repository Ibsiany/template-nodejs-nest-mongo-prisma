import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { ICreateUserDTO } from '../../../dtos/request/create-user-request.dto';
import { UserEntityInterface } from '../../../interfaces/user-entity.interface';
import { UserRepository } from '../../../repositories/user.repository';
import { CreateUserController } from '../create-user.controller';
import { CreateUserUseCase } from '../create-user.usecase';

describe('Create user Controller', () => {
  let app: INestApplication;
  let createUserUseCase: CreateUserUseCase;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [
        CreateUserUseCase,
        {
          provide: UserRepository,
          useValue: {},
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    createUserUseCase = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  it('should be defined', async () => {
    expect(createUserUseCase).toBeDefined();
  });

  it('Should be able to create user and return status 201', async () => {
    const user = {
      name: 'Test User',
      email: 'test@example.com',
      password: '******',
    } as ICreateUserDTO;
    const mockResponse = {} as UserEntityInterface;

    const createUserUseCaseSpy = jest
      .spyOn(createUserUseCase, 'execute')
      .mockResolvedValueOnce(mockResponse);

    const result = await request(app.getHttpServer())
      .post('/user')
      .send(user)
      .expect(HttpStatus.CREATED);

    expect(result.body).toEqual(mockResponse);
    expect(createUserUseCaseSpy).toHaveBeenCalledWith(user);
  });
});
