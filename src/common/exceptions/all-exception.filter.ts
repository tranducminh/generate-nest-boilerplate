import { JwtErrorMessage } from '@common/constants/jwt-error-message.const';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status, message;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    } else {
      switch (exception?.message) {
        case JwtErrorMessage.JWT_EXPIRED:
          message = 'Token is expired';
          status = HttpStatus.BAD_REQUEST;
          break;

        case JwtErrorMessage.JWT_MALFORMED:
        case JwtErrorMessage.INVALID_TOKEN:
          message = 'Token is invalid';
          status = HttpStatus.BAD_REQUEST;
          break;

        default:
          message = 'Internal server';
          status = HttpStatus.INTERNAL_SERVER_ERROR;
          break;
      }
    }

    message = message instanceof Object ? message?.message : message;

    console.log(exception);

    response.status(status).send({
      status,
      timestamp: new Date().toUTCString(),
      message,
      path: request.url,
    });
  }
}
