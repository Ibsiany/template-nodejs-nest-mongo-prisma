import { ApiProperty } from '@nestjs/swagger';
import { UserEntityDTO } from '../../../../dtos/response/user.entity.dto';

export class SessionResponseDTO {
  @ApiProperty({
    type: UserEntityDTO,
    description: 'User entity',
  })
  readonly user: UserEntityDTO;

  @ApiProperty({
    type: 'string',
    description: 'token',
  })
  readonly token: string;
}
