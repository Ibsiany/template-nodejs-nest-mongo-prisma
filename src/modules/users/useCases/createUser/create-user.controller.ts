import {
  Body,
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseControllerInterface } from '../../../../common/interfaces/base-controller.interface';
import multerConfig from '../../../../files/multer-config';
import { CustomApiResponseGetDataWrapper } from '../../../../system/decorators/swagger/api-response-get.decorator';
import { UserEntityDTO } from '../../dtos/response/user.entity.dto';
import { CreateUserUseCase } from './create-user.usecase';
import { CreateUserDTO } from './dtos/request/create-user-request.dto';

@ApiTags('User')
@Controller('user')
export class CreateUserController implements BaseControllerInterface {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @HttpCode(201)
  @ApiOperation({ summary: 'Create user' })
  @CustomApiResponseGetDataWrapper({
    status: 201,
    description: 'Create user',
    type: UserEntityDTO,
  })
  public async handle(
    @UploadedFile() file: Express.Multer.File,
    @Body() user: CreateUserDTO,
  ): Promise<UserEntityDTO> {
    return this.createUserUseCase.execute({ ...user, photo: file?.filename });
  }
}
