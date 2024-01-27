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
import { CardEntityDTO } from '../../dtos/response/card.entity.dto';
import { CardEntityInterface } from '../../interfaces/card-entity.interface';
import { UpdateCardParamsRequestDTO } from './dtos/request/update-card-params-request.dto copy';
import { UpdateCardUseCase } from './update-card.usecase';

@ApiTags('Card')
@Controller('card')
export class UpdateCardController implements BaseControllerInterface {
  constructor(private readonly updateCardUseCase: UpdateCardUseCase) {}

  @Patch('/:id')
  @HttpCode(201)
  @ApiOperation({ summary: 'Update card' })
  @CustomApiResponseGetDataWrapper({
    status: 201,
    description: 'Update user',
    type: CardEntityDTO,
  })
  public async handle(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() card: UpdateCardParamsRequestDTO,
  ): Promise<CardEntityInterface> {
    return this.updateCardUseCase.execute({
      ...card,
      id,
    });
  }
}
