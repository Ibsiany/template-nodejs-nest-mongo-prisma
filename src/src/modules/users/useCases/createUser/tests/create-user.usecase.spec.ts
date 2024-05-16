import { Test, TestingModule } from '@nestjs/testing';
import fs from 'fs';
import { ICreateUserDTO } from '../../../dtos/request/create-user-request.dto';
import { UserEntityInterface } from '../../../interfaces/user-entity.interface';
import { UserRepository } from '../../../repositories/user.repository';
import { CreateUserUseCase } from '../create-user.usecase';

jest.mock('fs');

describe('Create user UseCase', () => {
  let createUserUseCase: CreateUserUseCase, repository: UserRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: UserRepository,
          useValue: {
            findByEmail: jest.fn(),
            createAndSave: jest.fn(),
          },
        },
      ],
    }).compile();

    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);

    repository = await module.resolve<UserRepository>(UserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(createUserUseCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('Should be able to create user', async () => {
    fs.rmdirSync = jest.fn(() => 'mocked value');

    const user = {
      name: 'Test User',
      email: 'test@example.com',
      password: '******',
      photo: 'photo.png',
    } as ICreateUserDTO;

    const userCreated = Object.assign(user, { id: '1' }) as UserEntityInterface;

    const findByEmailUserSpy = jest
      .spyOn(repository, 'findByEmail')
      .mockResolvedValueOnce(null);

    const createAndSaveUserSpy = jest
      .spyOn(repository, 'createAndSave')
      .mockResolvedValueOnce(userCreated);

    const result = await createUserUseCase.execute(user);

    expect(fs.rmdirSync).toHaveBeenCalled();
    expect(result.id).toEqual(userCreated.id);
    expect(findByEmailUserSpy).toHaveBeenCalledWith(user.email);
    expect(createAndSaveUserSpy).toHaveBeenCalled();
  });
});
