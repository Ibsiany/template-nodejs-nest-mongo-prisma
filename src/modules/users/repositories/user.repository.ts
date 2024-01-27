import { PrismaService } from '../../../prisma.service';
import { ICreateUserDTO } from '../dtos/request/create-user-request.dto';
import { UserEntityInterface } from '../interfaces/user-entity.interface';
import { UserRepositoryInterface } from './interfaces/user-repository.interface';

export class UserRepository implements UserRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async createAndSave(new_user: ICreateUserDTO): Promise<UserEntityInterface> {
    return this.prisma.user.create({
      data: new_user,
    });
  }

  async updateAndSave(user: UserEntityInterface): Promise<UserEntityInterface> {
    return this.prisma.user.update({
      where: { id: user.id },
      data: user,
    });
  }

  async findByEmail(email: string): Promise<UserEntityInterface | null> {
    return this.prisma.user.findFirst({ where: { email } });
  }

  async findById(id: string): Promise<UserEntityInterface | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async deleteUser(user: UserEntityInterface): Promise<void> {
    await this.prisma.user.delete({
      where: { id: user.id },
    });
  }
}
