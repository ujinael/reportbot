import { HttpStatus, Injectable } from '@nestjs/common';
import { IncommingCalltouchWebhookDto } from './dto/incomming-webhook.dto';
import { CallTouchWebhookRepository } from './repository/webhook.repository';

@Injectable()
export class WebhookService {
  constructor(private readonly webhookRepository: CallTouchWebhookRepository) {}
  processIncommingWebhook(incommingWebhookDto: IncommingCalltouchWebhookDto) {
    return this.webhookRepository.post(incommingWebhookDto);
  }
}
