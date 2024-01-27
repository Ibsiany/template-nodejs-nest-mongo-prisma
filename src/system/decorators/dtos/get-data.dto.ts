import { ApiProperty } from '@nestjs/swagger';

export function getResponseForType<T>(type: T & { name: string }): any {
  class ResponseForType {
    @ApiProperty({ type })
    data: T;
  }

  Object.defineProperty(ResponseForType, 'name', {
    value: `ResponseFor${type.name}`,
  });

  return ResponseForType;
}
