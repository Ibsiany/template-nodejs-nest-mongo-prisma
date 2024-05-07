import {
  Body,
  Controller,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseControllerInterface } from '../../../../common/interfaces/base-controller.interface';
import { CustomApiResponseGetDataWrapper } from '../../../../system/decorators/swagger/api-response-get.decorator';
import { UserEntityDTO } from '../../dtos/response/user.entity.dto';
import { UpdateUserDTO } from './dtos/request/update-user-request.dto';
import { UpdateUserUseCase } from './update-user.usecase';

@ApiTags('User')
@Controller('user')
export class UpdateUserController implements BaseControllerInterface {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

  @Patch('/:id')
  @HttpCode(201)
  @ApiOperation({ summary: 'Update user' })
  @CustomApiResponseGetDataWrapper({
    status: 201,
    description: 'Update user',
    type: UserEntityDTO,
  })
  public async handle(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() user: UpdateUserDTO,
  ): Promise<UserEntityDTO> {
    return this.updateUserUseCase.execute({
      ...user,
      id,
    });
  }
}
