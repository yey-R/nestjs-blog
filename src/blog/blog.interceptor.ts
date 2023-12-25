import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageFullPath } from 'src/common/utils/ImageFullPath';

@Injectable()
export class BlogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data.image) {
          data.image = ImageFullPath(data.id, data.image);
        }

        return data;
      }),
    );
  }
}
