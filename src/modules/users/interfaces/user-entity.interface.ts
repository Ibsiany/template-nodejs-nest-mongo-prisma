import { CardEntityInterface } from '../../cards/interfaces/card-entity.interface';
import { CategoryEntityInterface } from '../../categories/interfaces/category-entity.interface';

export interface UserEntityInterface {
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  email: string;
  password: string;
  photo: string;
  category?: CategoryEntityInterface[];
  cards?: CardEntityInterface[];
}
