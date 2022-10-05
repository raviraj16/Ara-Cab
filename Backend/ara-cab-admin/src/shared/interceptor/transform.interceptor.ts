import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response {
    statusCode?: number;
    message?: string | string[];
    data: any;
    meta: any;
}

@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, Response> {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<Response> {
        return next
            .handle()
            .pipe(
                map((data) => ({
                    statusCode: context.switchToHttp().getResponse().statusCode as number,
                    message: (data && data.message) ? data.message : undefined,
                    data: (data && data.result) ? data.result : data,
                    meta: (data && data.meta) ? data.meta : undefined
                })),
            );
    }
}