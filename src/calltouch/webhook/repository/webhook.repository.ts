import { AbstractPostRepository } from '@/core';
import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { IncommingCalltouchWebhookDto } from '../dto';
import { Webhook } from '../entities';
@Injectable()
export class CallTouchWebhookRepository
  implements AbstractPostRepository<IncommingCalltouchWebhookDto>
{
  constructor(private readonly httpService: HttpService) {}
  async post(inputDto: IncommingCalltouchWebhookDto) {
    const $reposponse = this.httpService.post<Webhook>(
      '/calltouch_webhook/lead',
      inputDto,
    );
    const resp = await lastValueFrom($reposponse);

    return HttpStatus.OK;
  }
}
