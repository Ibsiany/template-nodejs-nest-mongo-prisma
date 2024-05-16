import { ApiProperty } from '@nestjs/swagger';

export class UserEntityDTO {
  @ApiProperty({
    type: 'string',
    description: 'id',
    example: '177f5cf2-ed0a-4e10-8160-a9c7d419f0c3',
  })
  readonly id: string;

  @ApiProperty({
    type: 'string',
    description: 'Createdd at',
    example: '2023-10-29T23:00:00.758Z',
  })
  readonly created_at: Date;

  @ApiProperty({
    type: 'string',
    description: 'Updated at',
    example: '2023-10-29T23:00:00.758Z',
  })
  readonly updated_at: Date;

  @ApiProperty({
    type: 'string',
    description: 'User name',
    example: 'Test',
  })
  readonly name: string;

  @ApiProperty({
    type: 'string',
    description: 'User email',
    example: 'test@example.com',
  })
  readonly email: string;

  @ApiProperty({
    type: 'string',
    description: 'User password',
    example: '********',
  })
  readonly password: string;

  @ApiProperty({
    type: 'string',
    description: 'Photo profile',
    example: 'photo.png',
  })
  readonly photo?: string;
}
