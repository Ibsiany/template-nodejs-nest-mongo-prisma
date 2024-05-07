import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseControllerInterface } from '../../../../common/interfaces/base-controller.interface';
import { CustomApiResponseGetDataWrapper } from '../../../../system/decorators/swagger/api-response-get.decorator';
import { UserEntityDTO } from '../../dtos/response/user.entity.dto';
import { CreateUserUseCase } from './create-user.usecase';
import { CreateUserDTO } from './dtos/request/create-user-request.dto';

@ApiTags('User')
@Controller('user')
export class CreateUserController implements BaseControllerInterface {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('/')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create user' })
  @CustomApiResponseGetDataWrapper({
    status: 201,
    description: 'Create user',
    type: UserEntityDTO,
  })
  public async handle(@Body() user: CreateUserDTO): Promise<UserEntityDTO> {
    return this.createUserUseCase.execute(user);
  }
}
