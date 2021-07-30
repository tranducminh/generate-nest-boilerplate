import { PaginationDto } from '@common/dtos/pagination.dto';
import { SuccessStatus } from '@common/constants/success-status.constant';
import { HttpStatus, Type } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { isSuccessHttpStatus } from '@utils/index';
import { AbstractBaseEntityDto } from '@base/dtos/base-entity.dto.abstract';

export const ApiSingleDataResponse = <T extends Type<AbstractBaseEntityDto>>(
  dto: T,
  status: HttpStatus = HttpStatus.OK
) => {
  return applyDecorators(
    ApiResponse({
      status,
      schema: {
        properties: {
          data: {
            type: 'object',
            $ref: getSchemaPath(dto),
          },
          status: {
            type: 'number',
            enum: Object.values(SuccessStatus),
            example: HttpStatus.OK,
          },
          message: {
            type: 'string',
            example: isSuccessHttpStatus(status) ? 'Successful' : 'Failed',
          },
        },
      },
    }),
    ApiExtraModels(dto)
  );
};

export const ApiMultipleDataResponse = <T extends Type<AbstractBaseEntityDto>>(
  dto: T,
  status: HttpStatus = HttpStatus.OK
) => {
  return applyDecorators(
    ApiResponse({
      status,
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(dto) },
          },
          pagination: {
            type: 'object',
            $ref: getSchemaPath(PaginationDto),
          },
          status: {
            type: 'number',
            enum: Object.values(HttpStatus),
            example: status,
          },
          message: {
            type: 'string',
            example: isSuccessHttpStatus(status) ? 'Successful' : 'Failed',
          },
        },
      },
    }),
    ApiExtraModels(dto, PaginationDto)
  );
};

export const ApiEmptyDataResponse = (status: HttpStatus = HttpStatus.OK) => {
  return applyDecorators(
    ApiResponse({
      status,
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'number',
            enum: Object.values(HttpStatus),
            example: status,
          },
          message: {
            type: 'string',
            example: isSuccessHttpStatus(status) ? 'Successful' : 'Failed',
          },
        },
      },
    })
  );
};
