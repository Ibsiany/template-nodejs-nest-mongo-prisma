import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { getManyResponseForType } from '../dtos/get-data-many.dto';

export const CustomApiResponseGetManyDataWrapper = (data: {
  type: any;
  status?: number | HttpStatus;
  description?: string;
}): any => {
  return applyDecorators(
    ApiResponse({
      status: data.status || HttpStatus.OK,
      description: data.description,
      type: getManyResponseForType(data.type),
    }),
  );
};
