import { Injectable } from '@nestjs/common';
import { CategoryEntityInterface } from '../../interfaces/category-entity.interface';
import { CategoryRepository } from '../../repositories/category.repository';

@Injectable()
export class GetCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public async execute(
    user_id: string,
    name?: string,
  ): Promise<CategoryEntityInterface[]> {
    return this.categoryRepository.findAll(user_id, name);
  }
}
