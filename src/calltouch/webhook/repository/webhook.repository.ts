import { AbstractPostRepository } from '@/core';
import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { lastValueFrom, map, throwError } from 'rxjs';
import { IncommingCalltouchWebhookDto } from '../dto';
import { Webhook } from '../entities';
@Injectable()
export class CallTouchWebhookRepository
  implements AbstractPostRepository<IncommingCalltouchWebhookDto>
{
  constructor(private readonly httpService: HttpService) {}
  async post(inputDto: IncommingCalltouchWebhookDto) {
    try {
      const $reposponse = this.httpService
        .post<Webhook>('/calltouch_webhook/lead', inputDto)
        .pipe(
          map((value) => {
            if (value.status === 500)
              return throwError(() => Error(String(value.data)));
          }),
        );
      await lastValueFrom($reposponse);

      return HttpStatus.OK;
    } catch (error) {
      Logger.error(error.message, 'CallTouchWebhookRepository.post');
    }
  }
}
