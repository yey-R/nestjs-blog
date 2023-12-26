import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageFullPath } from '../common/utils/ImageFullPath';

@Injectable()
export class BlogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((item) => {
            if (item.image) {
              item.image = ImageFullPath(item.id, item.image);
            }

            return item;
          });
        }

        if (data.image) {
          data.image = ImageFullPath(data.id, data.image);
        }

        return data;
      }),
    );
  }
}
