import {
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseControllerInterface } from '../../../../common/interfaces/base-controller.interface';
import { CustomApiResponseGetDataWrapper } from '../../../../system/decorators/swagger/api-response-get.decorator';
import { DeleteCategoryUseCase } from './delete-category.usecase';

@ApiTags('Category')
@Controller('category')
export class DeleteCategoryController implements BaseControllerInterface {
  constructor(private readonly deleteCategoryUseCase: DeleteCategoryUseCase) {}

  @Delete('/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete category' })
  @CustomApiResponseGetDataWrapper({
    status: 204,
    description: 'Delete category',
    type: 'void',
  })
  public async handle(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return this.deleteCategoryUseCase.execute(id);
  }
}
