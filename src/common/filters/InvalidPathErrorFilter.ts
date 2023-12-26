import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { InvalidPathError } from '../exceptions/InvalidPathError';

@Catch(InvalidPathError)
export class InvalidPathErrorFilter implements ExceptionFilter {
  catch(exception: InvalidPathError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.BAD_REQUEST,
      timestamp: new Date().toISOString(),
      message: 'Given path is invalid',
    });
  }
}
