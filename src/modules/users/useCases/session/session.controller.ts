import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseControllerInterface } from '../../../../common/interfaces/base-controller.interface';
import { CustomApiResponseGetDataWrapper } from '../../../../system/decorators/swagger/api-response-get.decorator';
import { SessionRequestDTO } from './dtos/request/session-request.dto';
import { SessionResponseDTO } from './dtos/response/session-response.dto';
import { SessionUseCase } from './session.usecase';

@ApiTags('User')
@Controller('user')
export class SessionController implements BaseControllerInterface {
  constructor(private readonly sessionUseCase: SessionUseCase) {}

  @Post('/session')
  @HttpCode(200)
  @ApiOperation({ summary: 'Session' })
  @CustomApiResponseGetDataWrapper({
    status: 200,
    description: 'Session',
    type: SessionResponseDTO,
  })
  public async handle(
    @Body() data: SessionRequestDTO,
  ): Promise<SessionResponseDTO> {
    return this.sessionUseCase.execute(data);
  }
}
