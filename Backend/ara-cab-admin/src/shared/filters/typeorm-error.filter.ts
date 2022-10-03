import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';
import { PostgresErrorCodes } from '../models/postgres-error-codes.enum';

@Catch(TypeORMError)
export class TypeOrmFilter implements ExceptionFilter {
    catch(exception: TypeORMError, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        let message: string = "Could not process your request";
        let code: number = HttpStatus.INTERNAL_SERVER_ERROR;
        let error = 'Internal Server Error';
        if ((exception as any).code) {
            switch ((exception as any).code) {
                case PostgresErrorCodes.UNDEFINED_TABLE:
                case PostgresErrorCodes.UNDEFINED_COLUMN:
                    message = 'This request can not be processed';
                    code = HttpStatus.UNPROCESSABLE_ENTITY;
                    error = 'Unprocessable Entity'
                    break;
                case PostgresErrorCodes.NOT_NULL_VIOLATION:
                    message = 'Missing required field(s)';
                    code = HttpStatus.BAD_REQUEST;
                    error = 'Bad Request';
                    break;
                case PostgresErrorCodes.UNIQUE_VIOLATION:
                    message = 'Duplicate entry';
                    code = HttpStatus.BAD_REQUEST;
                    error = 'Bad Request';
                    break;
                default:
                    message = 'Invalid request';
                    code = HttpStatus.BAD_REQUEST;
                    error = 'Bad Request';
            }
        } else if (exception instanceof EntityNotFoundError) {
            message = "Unable to find the requested item";
            code = HttpStatus.NOT_FOUND;
            error = 'Not Found';
        }
        response.status(code).json({ statusCode: code, message: [message], error });
    }
}