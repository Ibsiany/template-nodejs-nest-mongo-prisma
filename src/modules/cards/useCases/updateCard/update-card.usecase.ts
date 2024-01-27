import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from '../../../categories/repositories/category.repository';
import { CardEntityInterface } from '../../interfaces/card-entity.interface';
import { CardRepository } from '../../repositories/card.repository';
import { UpdateCardDTO } from './dtos/request/update-card-request.dto';

@Injectable()
export class UpdateCardUseCase {
  constructor(
    private readonly cardRepository: CardRepository,

    private readonly categoryRepository: CategoryRepository,
  ) {}

  public async execute({
    id,
    description,
    title,
    status,
    category_ids,
  }: UpdateCardDTO): Promise<CardEntityInterface> {
    if (!id && (!description || !title || !status)) {
      throw new BadRequestException('The id or the value was not inserted!');
    }

    const card = await this.cardRepository.findById(id);

    if (!card) {
      throw new NotFoundException('the card does not exist');
    }

    if (category_ids && category_ids?.length > 0) {
      for (const category_id of category_ids) {
        const category = await this.categoryRepository.findById(category_id);

        if (category) card.categories.push(category);
      }
    }

    if (description) {
      card.description = description;
    }

    if (title) {
      card.title = title;
    }

    if (status) {
      card.status = status;
    }

    await this.cardRepository.updateAndSave(card);

    return card;
  }
}
