import { CardEntityInterface } from '../../cards/interfaces/card-entity.interface';
import { UserEntityInterface } from '../../users/interfaces/user-entity.interface';

export interface CategoryEntityInterface {
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  user_id: string;
  user?: UserEntityInterface;
  cards?: CardEntityInterface[];
}
