import { CategoryEntityInterface } from '../../interfaces/category-entity.interface';
import { CreateyCategoryDTO } from '../../useCases/createCategory/dtos/request/create-category-request.dto';

export interface CategoryRepositoryInterface {
  createAndSave(
    data: CreateyCategoryDTO,
    user_id: string,
  ): Promise<CategoryEntityInterface>;
  findAll(user_id: string, name?: string): Promise<CategoryEntityInterface[]>;
  findById(id: string): Promise<CategoryEntityInterface>;
  deleteCategory(category: CategoryEntityInterface): Promise<void>;
}
