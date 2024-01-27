import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { CategoryRepository } from '../../../repositories/category.repository';
import { DeleteCategoryController } from '../delete-category.controller';
import { DeleteCategoryUseCase } from '../delete-category.usecase';

describe('Delete category Controller', () => {
  let app: INestApplication;
  let deleteCategoryUseCase: DeleteCategoryUseCase;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [DeleteCategoryController],
      providers: [
        DeleteCategoryUseCase,
        {
          provide: CategoryRepository,
          useValue: {},
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    deleteCategoryUseCase = moduleRef.get<DeleteCategoryUseCase>(
      DeleteCategoryUseCase,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  it('should be defined', async () => {
    expect(deleteCategoryUseCase).toBeDefined();
  });

  it('Should be able to delete category and return status 204', async () => {
    const createCategoryUseCaseSpy = jest
      .spyOn(deleteCategoryUseCase, 'execute')
      .mockResolvedValueOnce();

    const result = await request(app.getHttpServer())
      .delete('/category/c36614aa-b41d-4b3a-b454-bed69f431ff5')
      .expect(HttpStatus.NO_CONTENT);

    expect(createCategoryUseCaseSpy).toHaveBeenCalled();
  });
});
