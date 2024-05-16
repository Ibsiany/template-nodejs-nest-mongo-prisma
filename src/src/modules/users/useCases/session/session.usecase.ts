import { BadRequestException, Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { v4 as uuidV4 } from 'uuid';
import { UserRepository } from '../../repositories/user.repository';
import { SessionRequestDTO } from './dtos/request/session-request.dto';
import { SessionResponseDTO } from './dtos/response/session-response.dto';

@Injectable()
export class SessionUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute({
    email,
    password,
  }: SessionRequestDTO): Promise<SessionResponseDTO> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Incorrect email/password');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new BadRequestException('Incorrect email/password');
    }

    const token = sign({}, uuidV4(), {
      subject: user.id,
      expiresIn: 1,
    });

    return {
      user,
      token,
    };
  }
}
