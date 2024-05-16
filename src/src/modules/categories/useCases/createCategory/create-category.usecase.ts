import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../../../users/repositories/user.repository';
import { CategoryEntityInterface } from '../../interfaces/category-entity.interface';
import { CategoryRepository } from '../../repositories/category.repository';
import { CreateyCategoryDTO } from './dtos/request/create-category-request.dto';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,

    private readonly userRepository: UserRepository,
  ) {}

  public async execute(
    { name, color }: CreateyCategoryDTO,
    user_id: string,
  ): Promise<CategoryEntityInterface> {
    if (!name || !user_id) {
      throw new BadRequestException('Name/User id is required!');
    }

    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new NotFoundException('User does not exists!');
    }

    user.category_ids = user.category_ids || [];

    const card = await this.categoryRepository.createAndSave(
      { name, color },
      user.id,
    );

    user.category_ids.push(card.id);

    await this.userRepository.updateAndSave(user);

    return card;
  }
}
