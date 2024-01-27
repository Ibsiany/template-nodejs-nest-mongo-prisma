import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { ICreateUserDTO } from '../../../dtos/request/create-user-request.dto';
import { UserEntityInterface } from '../../../interfaces/user-entity.interface';
import { UserRepository } from '../../../repositories/user.repository';
import { UpdateUserController } from '../update-user.controller';
import { UpdateUserUseCase } from '../update-user.usecase';

describe('Update user Controller', () => {
  let app: INestApplication;
  let updateUserUseCase: UpdateUserUseCase;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UpdateUserController],
      providers: [
        UpdateUserUseCase,
        {
          provide: UserRepository,
          useValue: {},
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    updateUserUseCase = moduleRef.get<UpdateUserUseCase>(UpdateUserUseCase);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  it('should be defined', async () => {
    expect(updateUserUseCase).toBeDefined();
  });

  it('Should be able to update user and return status 201', async () => {
    const user = {
      id: 'c36614aa-b41d-4b3a-b454-bed69f431ff5',
      name: 'Test User',
      email: 'test@example.com',
      password: '******',
    } as ICreateUserDTO;
    const mockResponse = {} as UserEntityInterface;

    const createUserUseCaseSpy = jest
      .spyOn(updateUserUseCase, 'execute')
      .mockResolvedValueOnce(mockResponse);

    const result = await request(app.getHttpServer())
      .patch('/user/c36614aa-b41d-4b3a-b454-bed69f431ff5')
      .send(user)
      .expect(HttpStatus.CREATED);

    expect(result.body).toEqual(mockResponse);
    expect(createUserUseCaseSpy).toHaveBeenCalledWith(user);
  });
});
