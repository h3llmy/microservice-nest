import { ArgumentsHost, BadRequestException, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { throwError } from 'rxjs';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryErrorFilter extends BaseRpcExceptionFilter {
  public catch(exception: any, host: ArgumentsHost): any {
    const detail = exception.detail;
    if (typeof detail === 'string' && detail.includes('already exists')) {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

      const messageStart = exception.table.split('_').join(' ') + ' with';
      //   throw new BadRequestException(
      //     exception.detail.replace('Key', messageStart),
      //   );
      return throwError(() => exception.detail.replace('Key', messageStart));
    }
    return super.catch(exception, host);
  }
}
