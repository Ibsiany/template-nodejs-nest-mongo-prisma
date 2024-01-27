import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { UserRepository } from '../../../repositories/user.repository';
import { SessionResponseDTO } from '../dtos/response/session-response.dto';
import { SessionController } from '../session.controller';
import { SessionUseCase } from '../session.usecase';

describe('Session Controller', () => {
  let app: INestApplication;
  let sessionUseCase: SessionUseCase;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [SessionController],
      providers: [
        SessionUseCase,
        {
          provide: UserRepository,
          useValue: {},
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    sessionUseCase = moduleRef.get<SessionUseCase>(SessionUseCase);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  it('should be defined', async () => {
    expect(sessionUseCase).toBeDefined();
  });

  it('Should be able to log in', async () => {
    const user = {
      email: 'test@example.com',
      password: '********',
    };

    const mockResponse = {
      user,
      token: 'testToken',
    } as SessionResponseDTO;

    const sessionUseCaseSpy = jest
      .spyOn(sessionUseCase, 'execute')
      .mockResolvedValueOnce(mockResponse);

    const result = await request(app.getHttpServer())
      .post('/user/session')
      .send(user)
      .expect(HttpStatus.OK);

    expect(sessionUseCaseSpy).toHaveBeenCalled();
    expect(result.body).toEqual(mockResponse);
  });
});
