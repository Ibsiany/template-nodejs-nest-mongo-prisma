import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserEntityInterface } from '../../../users/interfaces/user-entity.interface';

export class CardEntityDTO {
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
    description: 'Description card',
    example: 'create crud',
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    type: 'string',
    description: 'Status card',
    example: '10',
  })
  @IsString()
  readonly status: string;

  @ApiProperty({
    type: 'string',
    description: 'Title card',
    example: 'Create CRUD',
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    type: 'string',
    description: 'User id',
    example: '177f5cf2-ed0a-4e10-8160-a9c7d419f0c3',
  })
  readonly user_id: string;

  @ApiProperty({
    type: 'string',
    description: 'User',
  })
  @IsString()
  readonly user: UserEntityInterface;
}
