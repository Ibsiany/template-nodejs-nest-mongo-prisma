import {
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseControllerInterface } from '../../../../common/interfaces/base-controller.interface';
import { CustomApiResponseGetManyDataWrapper } from '../../../../system/decorators/swagger/api-response-get-many.decorator';
import { CategoryEntityDTO } from '../../dtos/response/category.entity.dto';
import { CategoryEntityInterface } from '../../interfaces/category-entity.interface';
import { GetCategoriesUseCase } from './get-categories.usecase';

@ApiTags('Category')
@Controller('category')
export class GetCategoriesController implements BaseControllerInterface {
  constructor(private readonly getCategoriesUseCase: GetCategoriesUseCase) {}

  @Get('/:user_id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get categories' })
  @CustomApiResponseGetManyDataWrapper({
    status: 200,
    description: 'Get categories',
    type: CategoryEntityDTO,
  })
  public async handle(
    @Param('user_id', new ParseUUIDPipe()) user_id: string,
    @Query() data: { name: string },
  ): Promise<CategoryEntityInterface[]> {
    return this.getCategoriesUseCase.execute(user_id, data?.name);
  }
}
