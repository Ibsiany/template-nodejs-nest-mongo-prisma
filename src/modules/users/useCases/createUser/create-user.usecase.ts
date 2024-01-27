import { BadRequestException, Injectable } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcryptjs';
import { ICreateUserDTO } from '../../dtos/request/create-user-request.dto';
import { UserEntityInterface } from '../../interfaces/user-entity.interface';
import { UserRepository } from '../../repositories/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute({
    name,
    email,
    password,
    photo,
  }: ICreateUserDTO): Promise<UserEntityInterface> {
    if (!name || !email || !password) {
      throw new BadRequestException('Missins params!');
    }

    const foundUser = await this.userRepository.findByEmail(email);

    if (foundUser) {
      throw new BadRequestException('User already exists!');
    }

    const salt = genSaltSync(8);
    const hash = hashSync(password, salt);

    const user = (await this.userRepository.createAndSave({
      name,
      email,
      password: hash,
      photo,
    })) as UserEntityInterface;

    return { ...user, password: '' };
  }
}
