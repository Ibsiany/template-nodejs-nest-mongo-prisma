import { CategoryEntityInterface } from '../../categories/interfaces/category-entity.interface';
import { UserEntityInterface } from '../../users/interfaces/user-entity.interface';

export interface CardEntityInterface {
  id: string;
  status: string;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  categories?: CategoryEntityInterface[];
  user?: UserEntityInterface;
}
