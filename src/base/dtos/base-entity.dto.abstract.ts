import { ResponseDto } from '@common/dtos/response.dto';
import { HttpStatus } from '@nestjs/common';

export abstract class AbstractBaseEntityDto {
  toResponse(status?: HttpStatus, message?: string) {
    return new ResponseDto({ data: this, status, message });
  }
}
