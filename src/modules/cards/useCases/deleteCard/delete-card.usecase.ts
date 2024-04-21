import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../../../users/repositories/user.repository';
import { CardRepository } from '../../repositories/card.repository';

@Injectable()
export class DeleteCardUseCase {
  constructor(
    private readonly cardRepository: CardRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException('The property id is required!');
    }

    const card = await this.cardRepository.findById(id);

    if (!card) {
      throw new NotFoundException('The card does not exist');
    }

    const user = await this.userRepository.findById(card.user_id);

    if (user) {
      user.card_ids =
        user.card_ids?.filter((card_id) => card_id !== card.id) || [];

      await this.userRepository.updateAndSave(user);
    }

    await this.cardRepository.deleteCard(card);
  }
}
