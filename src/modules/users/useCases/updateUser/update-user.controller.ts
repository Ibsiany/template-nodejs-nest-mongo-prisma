import {
  Body,
  Controller,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseControllerInterface } from '../../../../common/interfaces/base-controller.interface';
import multerConfig from '../../../../files/multer-config';
import { CustomApiResponseGetDataWrapper } from '../../../../system/decorators/swagger/api-response-get.decorator';
import { UserEntityDTO } from '../../dtos/response/user.entity.dto';
import { UpdateUserDTO } from './dtos/request/update-user-request.dto';
import { UpdateUserUseCase } from './update-user.usecase';

@ApiTags('User')
@Controller('user')
export class UpdateUserController implements BaseControllerInterface {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @HttpCode(201)
  @ApiOperation({ summary: 'Update user' })
  @CustomApiResponseGetDataWrapper({
    status: 201,
    description: 'Update user',
    type: UserEntityDTO,
  })
  public async handle(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() user: UpdateUserDTO,
  ): Promise<UserEntityDTO> {
    return this.updateUserUseCase.execute({
      ...user,
      id,
      photo: file?.filename,
    });
  }
}
