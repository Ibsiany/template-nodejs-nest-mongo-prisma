import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SessionRequestDTO {
  @ApiProperty({
    type: 'string',
    description: 'User email',
    example: 'test@example.com',
  })
  @IsString()
  readonly email: string;

  @ApiProperty({
    type: 'string',
    description: 'User password',
    example: '********',
  })
  @IsString()
  readonly password: string;
}
