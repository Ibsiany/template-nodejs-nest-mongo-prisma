import { Module } from '@nestjs/common';
import { CategoryRepository } from '../categories/repositories/category.repository';
import { UserRepository } from '../users/repositories/user.repository';
import { CardRepository } from './repositories/card.repository';
import { CreateCardController } from './useCases/createCard/create-card.controller';
import { CreateCardUseCase } from './useCases/createCard/create-card.usecase';
import { DeleteCardController } from './useCases/deleteCard/delete-card.controller';
import { DeleteCardUseCase } from './useCases/deleteCard/delete-card.usecase';
import { GetCardsController } from './useCases/getCards/get-cards.controller';
import { GetCardsUseCase } from './useCases/getCards/get-cards.usecase';
import { UpdateCardController } from './useCases/updateCard/update-card.controller';
import { UpdateCardUseCase } from './useCases/updateCard/update-card.usecase';

@Module({
  providers: [
    CardRepository,
    CategoryRepository,
    UserRepository,
    CreateCardUseCase,
    DeleteCardUseCase,
    GetCardsUseCase,
    UpdateCardUseCase,
  ],
  controllers: [
    CreateCardController,
    DeleteCardController,
    GetCardsController,
    UpdateCardController,
  ],
})
export class CardModule {}
