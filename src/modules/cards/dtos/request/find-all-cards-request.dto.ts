import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindAllCardsDTO {
  @ApiPropertyOptional({
    type: 'string',
    description: 'id',
    example: '177f5cf2-ed0a-4e10-8160-a9c7d419f0c3',
  })
  @IsOptional()
  @IsString()
  readonly id: string;

  @ApiPropertyOptional({
    type: 'string',
    description: 'Description card',
    example: 'create crud',
  })
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiPropertyOptional({
    type: 'string',
    description: 'Status card',
    example: '10',
  })
  @IsString()
  @IsOptional()
  readonly status: string;

  @ApiPropertyOptional({
    type: 'string',
    description: 'Title card',
    example: 'Create CRUD',
  })
  @IsString()
  @IsOptional()
  readonly title: string;

  @ApiProperty({
    type: 'string',
    description: 'User id',
    example: '177f5cf2-ed0a-4e10-8160-a9c7d419f0c3',
  })
  @IsString()
  readonly user_id: string;
}
