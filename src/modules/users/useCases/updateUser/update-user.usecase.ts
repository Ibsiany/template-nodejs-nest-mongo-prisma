import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { UserEntityInterface } from '../../interfaces/user-entity.interface';
import { UserRepository } from '../../repositories/user.repository';
import { UpdateUserDTO } from './dtos/request/update-user-request.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute({
    id,
    name,
    email,
    password,
    photo,
    new_password,
  }: UpdateUserDTO): Promise<UserEntityInterface> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User does not exists');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new BadRequestException('Password incorrect');
    }

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }

    if (photo) {
      fs.rmdirSync(path.join(__dirname, `../../../../uploads/${user.photo}`));

      user.photo = photo;
    }

    if (new_password) {
      const hashedPassword = await hash(new_password, 8);

      user.password = hashedPassword;
    }

    await this.userRepository.updateAndSave(user);

    return { ...user, password: '' };
  }
}
