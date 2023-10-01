import { HttpStatus, Injectable } from '@nestjs/common';
import { IncommingCalltouchWebhookDto } from './dto/incomming-webhook.dto';

@Injectable()
export class WebhookService {
  processIncommingWebhook(incommingWebhookDto: IncommingCalltouchWebhookDto) {
    console.log(incommingWebhookDto);

    return HttpStatus.OK;
  }
}
