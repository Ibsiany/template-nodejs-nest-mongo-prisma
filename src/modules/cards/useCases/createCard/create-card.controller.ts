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
import { CardEntityDTO } from '../../dtos/response/card.entity.dto';
import { CardEntityInterface } from '../../interfaces/card-entity.interface';
import { CreateCardUseCase } from './create-card.usecase';
import { CreateCardDTO } from './dtos/request/create-card-request.dto';

@ApiTags('Card')
@Controller('card')
export class CreateCardController implements BaseControllerInterface {
  constructor(private readonly createCardUseCase: CreateCardUseCase) {}

  @Post('/:user_id')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create card' })
  @CustomApiResponseGetDataWrapper({
    status: 201,
    description: 'Create card',
    type: CardEntityDTO,
  })
  public async handle(
    @Param('user_id', new ParseUUIDPipe()) user_id: string,
    @Body() card: CreateCardDTO,
  ): Promise<CardEntityInterface> {
    return this.createCardUseCase.execute({ ...card, user_id });
  }
}
