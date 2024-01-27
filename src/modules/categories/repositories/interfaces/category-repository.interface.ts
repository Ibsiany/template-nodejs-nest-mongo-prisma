import { CategoryEntityInterface } from '../../interfaces/category-entity.interface';

export interface CategoryRepositoryInterface {
  createAndSave(
    name: string,
    user_id: string,
  ): Promise<CategoryEntityInterface>;
  findAll(user_id: string, name?: string): Promise<CategoryEntityInterface[]>;
  findById(id: string): Promise<CategoryEntityInterface>;
  deleteCategory(category: CategoryEntityInterface): Promise<void>;
}
