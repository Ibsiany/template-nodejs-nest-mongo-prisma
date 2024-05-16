import { Module } from '@nestjs/common';
import { CardRepository } from '../cards/repositories/card.repository';
import { CategoryRepository } from '../categories/repositories/category.repository';
import { UserRepository } from './repositories/user.repository';
import { CreateUserController } from './useCases/createUser/create-user.controller';
import { CreateUserUseCase } from './useCases/createUser/create-user.usecase';
import { DeleteUserController } from './useCases/deleteUser/delete-user.controller';
import { DeleteUserUseCase } from './useCases/deleteUser/delete-user.usecase';
import { GetUserByIdController } from './useCases/getUserById/get-user-by-id.controller';
import { GetUserByIdUseCase } from './useCases/getUserById/get-user-by-id.usecase';
import { SessionController } from './useCases/session/session.controller';
import { SessionUseCase } from './useCases/session/session.usecase';
import { UpdateUserController } from './useCases/updateUser/update-user.controller';
import { UpdateUserUseCase } from './useCases/updateUser/update-user.usecase';

@Module({
  providers: [
    UserRepository,
    CategoryRepository,
    CardRepository,
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserByIdUseCase,
    SessionUseCase,
    UpdateUserUseCase,
  ],
  controllers: [
    CreateUserController,
    DeleteUserController,
    GetUserByIdController,
    SessionController,
    UpdateUserController,
  ],
})
export class UserModule {}
