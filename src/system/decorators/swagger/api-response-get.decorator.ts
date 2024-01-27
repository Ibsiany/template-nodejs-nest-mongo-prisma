import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { getResponseForType } from '../dtos/get-data.dto';

export const CustomApiResponseGetDataWrapper = (data: {
  type: any;
  status?: number | HttpStatus;
  description?: string;
}): any => {
  return applyDecorators(
    ApiResponse({
      status: data.status || HttpStatus.OK,
      description: data.description,
      type: getResponseForType(data.type),
    }),
  );
};
