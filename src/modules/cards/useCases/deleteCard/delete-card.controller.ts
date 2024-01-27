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
import { DeleteCardUseCase } from './delete-card.usecase';

@ApiTags('Card')
@Controller('card')
export class DeleteCardController implements BaseControllerInterface {
  constructor(private readonly deleteCardUseCase: DeleteCardUseCase) {}

  @Delete('/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete card' })
  @CustomApiResponseGetDataWrapper({
    status: 204,
    description: 'Delete card',
    type: 'void',
  })
  public async handle(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return this.deleteCardUseCase.execute(id);
  }
}
