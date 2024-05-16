import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../../../users/repositories/user.repository';
import { CardEntityInterface } from '../../interfaces/card-entity.interface';
import { CardRepository } from '../../repositories/card.repository';
import { CreateCardDTO } from './dtos/request/create-card-request.dto';

@Injectable()
export class CreateCardUseCase {
  constructor(
    private readonly cardRepository: CardRepository,

    private readonly userRepository: UserRepository,
  ) {}

  public async execute({
    user_id,
    description,
    title,
    status,
    category_ids,
  }: CreateCardDTO): Promise<CardEntityInterface> {
    if (!user_id || !description || !title || !status) {
      throw new BadRequestException('Error in the creation of the card!');
    }

    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new NotFoundException('User does not exists!');
    }

    const card = await this.cardRepository.createAndSave({
      status,
      title,
      description,
      user_id: user.id,
      category_ids: category_ids || [],
    });

    user.card_ids = user.card_ids || [];
    user.card_ids.push(card.id);

    await this.userRepository.updateAndSave(user);

    return card;
  }
}
