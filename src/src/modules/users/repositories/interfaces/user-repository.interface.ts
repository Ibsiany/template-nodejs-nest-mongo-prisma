import { ICreateUserDTO } from '../../dtos/request/create-user-request.dto';
import { UserEntityInterface } from '../../interfaces/user-entity.interface';

export interface UserRepositoryInterface {
  createAndSave(new_user: ICreateUserDTO): Promise<UserEntityInterface>;
  updateAndSave(user: UserEntityInterface): Promise<UserEntityInterface>;
  findById(id: string): Promise<UserEntityInterface>;
  findByEmail(email: string): Promise<UserEntityInterface>;
  deleteUser(user: UserEntityInterface): Promise<void>;
}
