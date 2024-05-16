import {
  Body,
  Controller,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseControllerInterface } from '../../../../common/interfaces/base-controller.interface';
import { CustomApiResponseGetDataWrapper } from '../../../../system/decorators/swagger/api-response-get.decorator';
import { CategoryEntityDTO } from '../../dtos/response/category.entity.dto';
import { CategoryEntityInterface } from '../../interfaces/category-entity.interface';
import { CreateCategoryUseCase } from './create-category.usecase';
import { CreateyCategoryDTO } from './dtos/request/create-category-request.dto';

@ApiTags('Category')
@Controller('category')
export class CreateCategoryController implements BaseControllerInterface {
  constructor(private readonly createCategoryUseCase: CreateCategoryUseCase) {}

  @Post('/:user_id')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create category' })
  @CustomApiResponseGetDataWrapper({
    status: 201,
    description: 'Create category',
    type: CategoryEntityDTO,
  })
  public async handle(
    @Body() data: CreateyCategoryDTO,
    @Param('user_id', new ParseUUIDPipe()) user_id: string,
  ): Promise<CategoryEntityInterface> {
    return this.createCategoryUseCase.execute(data, user_id);
  }
}
