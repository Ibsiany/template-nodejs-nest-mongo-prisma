import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntityInterface } from '../../interfaces/user-entity.interface';
import { UserRepository } from '../../repositories/user.repository';

@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(id: string): Promise<UserEntityInterface> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User does not exists!');
    }

    return user;
  }
}
