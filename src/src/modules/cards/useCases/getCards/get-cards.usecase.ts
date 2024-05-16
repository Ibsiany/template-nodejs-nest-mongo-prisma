import { Injectable } from '@nestjs/common';
import { FindAllCardsDTO } from '../../dtos/request/find-all-cards-request.dto';
import { CardEntityInterface } from '../../interfaces/card-entity.interface';
import { CardRepository } from '../../repositories/card.repository';

@Injectable()
export class GetCardsUseCase {
  constructor(private readonly cardRepository: CardRepository) {}

  public async execute(query: FindAllCardsDTO): Promise<CardEntityInterface[]> {
    return this.cardRepository.findAll(query);
  }
}
