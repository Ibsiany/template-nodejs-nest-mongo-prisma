import {
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseControllerInterface } from '../../../../common/interfaces/base-controller.interface';
import { CustomApiResponseGetManyDataWrapper } from '../../../../system/decorators/swagger/api-response-get-many.decorator';
import { CardEntityDTO } from '../../dtos/response/card.entity.dto';
import { CardEntityInterface } from '../../interfaces/card-entity.interface';
import { FindAllCardsRequestDTO } from './dtos/request/get-cards-request.dto';
import { GetCardsUseCase } from './get-cards.usecase';

@ApiTags('Card')
@Controller('card')
export class GetCardsController implements BaseControllerInterface {
  constructor(private readonly getCardsUseCase: GetCardsUseCase) {}

  @Get('/:user_id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get cards' })
  @CustomApiResponseGetManyDataWrapper({
    status: 200,
    description: 'Get cards',
    type: CardEntityDTO,
  })
  public async handle(
    @Param('user_id', new ParseUUIDPipe()) user_id: string,
    @Query() data: FindAllCardsRequestDTO,
  ): Promise<CardEntityInterface[]> {
    return this.getCardsUseCase.execute({ ...data, user_id });
  }
}
