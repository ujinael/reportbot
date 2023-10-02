import { Injectable, Logger } from '@nestjs/common';
import { CallTouchRequest } from '../entities/request.entity';
import { ConfigService } from '@nestjs/config';
import { catchError, lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ICallTouchRequestDtoToCallTouchRequestMapper } from '../mappers';
import { ICallTouchRequestDto } from '../dto';
import { AbstractFindAllRepository, AbstractRepository, dayjs } from '@/core';

@Injectable()
export class CallTouchApiRequestRepository
  implements AbstractFindAllRepository<CallTouchRequest>
{
  constructor(
    private configService: ConfigService,
    private httpModule: HttpService,
  ) {}
  async findAll(dateFrom: Date, dateTo: Date) {
    const $dateFrom = dayjs(dateFrom).format('MM/DD/YYYY');
    const $dateTo = dayjs(dateTo).format('MM/DD/YYYY');
    const token = this.configService.get('calltouch.token');
    const $responseData = this.httpModule
      .get<ICallTouchRequestDto[]>(`calls-service/RestAPI/requests`, {
        params: {
          dateFrom: $dateFrom,
          dateTo: $dateTo,
          clientApiId: token,
        },
      })
      .pipe(
        catchError((error, resp) => {
          Logger.error(error.message, 'CallTouchApiRequestRepository.findAll');
          return resp;
        }),
      )
      .pipe(
        map((resp) =>
          resp.data.map((requestDto) =>
            new ICallTouchRequestDtoToCallTouchRequestMapper(
              requestDto,
            ).mapTo(),
          ),
        ),
      );
    return lastValueFrom($responseData);
  }
}
