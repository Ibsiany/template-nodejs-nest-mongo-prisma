import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CategoryEntityDTO {
  @ApiProperty({
    type: 'string',
    description: 'Entity id',
    example: '177f5cf2-ed0a-4e10-8160-a9c7d419f0c3',
  })
  @IsString()
  readonly id: string;

  @ApiProperty({
    type: 'string',
    description: 'Created date',
    example: '2022-01-13T01:06:54.758Z',
  })
  readonly created_at: Date;

  @ApiProperty({
    type: 'string',
    description: 'Updated date',
    example: '2022-01-13T01:06:54.758Z',
  })
  readonly updated_at: Date;

  @ApiProperty({
    type: 'string',
    description: 'User name',
    example: 'Test',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    type: 'string',
    description: 'User id',
    example: '177f5cf2-ed0a-4e10-8160-a9c7d419f0c3',
  })
  @IsString()
  readonly user_id: string;
}
