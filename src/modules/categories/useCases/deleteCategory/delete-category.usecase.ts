import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from '../../repositories/category.repository';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException('The property id is required!');
    }

    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new NotFoundException('The category does not exist');
    }

    try {
      await this.categoryRepository.deleteCategory(category);
    } catch (err) {
      throw new BadRequestException(`Error deleting category ${err}`);
    }
  }
}
