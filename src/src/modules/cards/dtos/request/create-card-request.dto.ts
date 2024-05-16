import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAndSaveCardDTO {
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
    description: 'User',
  })
  @IsString()
  readonly user_id: string;

  @ApiPropertyOptional({
    type: 'string',
    description: 'Category ids',
    example: ['177f5cf2-ed0a-4e10-8160-a9c7d419f0c3'],
  })
  readonly category_ids: string[];
}
