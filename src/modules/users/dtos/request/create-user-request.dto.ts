import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ICreateUserDTO {
  @ApiProperty({
    type: 'string',
    description: 'User name',
    example: 'Test',
  })
  @IsString()
  readonly name: string;

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

  @ApiProperty({
    type: 'string',
    description: 'Photo profile',
    example: 'photo.png',
  })
  @IsString()
  readonly photo?: string;
}
