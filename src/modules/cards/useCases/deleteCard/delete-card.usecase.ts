import { Injectable } from '@nestjs/common';
import { CardRepository } from '../../repositories/card.repository';

@Injectable()
export class DeleteCardUseCase {
  constructor(private readonly cardRepository: CardRepository) {}

  public async execute(id: string): Promise<void> {
    const card = await this.cardRepository.findById(id);

    await this.cardRepository.deleteCard(card);
  }
}
