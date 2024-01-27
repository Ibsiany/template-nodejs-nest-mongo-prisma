import { ApiProperty } from '@nestjs/swagger';

export function getManyResponseForType<T>(type: T & { name: string }): any {
  class ManyResponseForType {
    @ApiProperty({ type, isArray: true })
    data: T[];
  }

  Object.defineProperty(ManyResponseForType, 'name', {
    value: `ManyResponseFor${type.name}`,
  });

  return ManyResponseForType;
}
