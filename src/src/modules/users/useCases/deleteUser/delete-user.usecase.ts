import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindAllCardsDTO } from '../../../cards/dtos/request/find-all-cards-request.dto';
import { CardRepository } from '../../../cards/repositories/card.repository';
import { CategoryRepository } from '../../../categories/repositories/category.repository';
import { UserRepository } from '../../repositories/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,

    private readonly categoryRepository: CategoryRepository,

    private readonly cardRepository: CardRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User does not exists!');
    }

    const categories = await this.categoryRepository.findAll(id);

    for await (const category of categories) {
      try {
        await this.categoryRepository.deleteCategory(category);
      } catch (err) {
        throw new BadRequestException(`Error deleting category ${err}`);
      }
    }

    const cards = await this.cardRepository.findAll({
      user_id: id,
    } as FindAllCardsDTO);

    for await (const card of cards) {
      try {
        await this.cardRepository.deleteCard(card);
      } catch (err) {
        throw new BadRequestException(`Error deleting card ${err}`);
      }
    }

    await this.userRepository.deleteUser(user);
  }
}
