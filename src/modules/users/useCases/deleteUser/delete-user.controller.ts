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
import { DeleteUserUseCase } from './delete-user.usecase';

@ApiTags('User')
@Controller('user')
export class DeleteUserController implements BaseControllerInterface {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  @Delete('/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete user' })
  @CustomApiResponseGetDataWrapper({
    status: 204,
    description: 'Delete user',
    type: 'void',
  })
  public async handle(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return this.deleteUserUseCase.execute(id);
  }
}
