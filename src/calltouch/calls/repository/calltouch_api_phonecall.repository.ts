import { AbstractFindAllRepository, dayjs } from '@/core';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, lastValueFrom, map } from 'rxjs';
import { ICalltouchPhoneCallDto } from '../dto/calltouch-phonecall.dto';
import { CallTouchPhoneCall } from '../entities/phonecall.entity';
import { ICallTouchPhoneCallDtoToCallTouchPhoneCallMapper } from '../mappers/ICallTouchPhoneCallDtoToPhoneCallMapper';

@Injectable()
export class CallTouchApiPhoneCallRepository
  implements AbstractFindAllRepository<CallTouchPhoneCall>
{
  constructor(
    private configService: ConfigService,
    private httpModule: HttpService,
  ) {}
  async findAll(dateFrom: Date, dateTo: Date): Promise<CallTouchPhoneCall[]> {
    const $dateFrom = dayjs(dateFrom).format('DD/MM/YYYY');
    const $dateTo = dayjs(dateTo).format('DD/MM/YYYY');
    const clientId = this.configService.get('calltouch.clientId');
    const token = this.configService.get('calltouch.token');
    const $responseData = this.httpModule
      .get<ICalltouchPhoneCallDto[]>(
        `calls-service/RestAPI/${clientId}/calls-diary/calls`,
        {
          params: {
            dateFrom: $dateFrom,
            dateTo: $dateTo,
            clientApiId: token,
          },
        },
      )
      .pipe(
        catchError((error, resp) => {
          Logger.error(
            error.message,
            'CallTouchApiPhoneCallRepository.findAll',
          );
          return resp;
        }),
      )
      .pipe(
        map((resp) =>
          resp.data.map((phoneDto) =>
            new ICallTouchPhoneCallDtoToCallTouchPhoneCallMapper(
              phoneDto,
            ).mapTo(),
          ),
        ),
      );
    return lastValueFrom($responseData);
  }
}
