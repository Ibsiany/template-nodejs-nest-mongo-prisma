import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserDTO {
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

  @ApiPropertyOptional({
    type: 'string',
    description: 'Photo profile',
    example: 'photo.png',
  })
  @IsString()
  @IsOptional()
  readonly photo?: string;
}
