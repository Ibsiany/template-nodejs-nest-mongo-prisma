import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../../../users/repositories/user.repository';
import { CategoryRepository } from '../../repositories/category.repository';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException('The property id is required!');
    }

    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new NotFoundException('The category does not exist');
    }

    const user = await this.userRepository.findById(category.user_id);

    if (user) {
      user.category_ids =
        user?.category_ids?.filter(
          (categoryId) => categoryId !== category.id,
        ) || [];

      await this.userRepository.updateAndSave(user);
    }

    try {
      await this.categoryRepository.deleteCategory(category);
    } catch (err) {
      throw new BadRequestException(`Error deleting category ${err}`);
    }
  }
}
