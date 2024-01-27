import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty({
    type: 'string',
    description: 'id',
    example: '177f5cf2-ed0a-4e10-8160-a9c7d419f0c3',
  })
  readonly id: string;

  @ApiProperty({
    type: 'string',
    description: 'User name',
    example: 'Test',
  })
  @IsString()
  @IsOptional()
  readonly name: string;

  @ApiProperty({
    type: 'string',
    description: 'User email',
    example: 'test@example.com',
  })
  @IsString()
  @IsOptional()
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
    description: 'New user password',
    example: '********',
  })
  @IsString()
  @IsOptional()
  readonly new_password: string;

  @ApiPropertyOptional({
    type: 'string',
    description: 'Photo profile',
    example: 'photo.png',
  })
  @IsString()
  @IsOptional()
  readonly photo?: string;
}
