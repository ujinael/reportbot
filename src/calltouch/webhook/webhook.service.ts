import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { IncommingCalltouchWebhookDto } from './dto/incomming-webhook.dto';
import { CallTouchWebhookRepository } from './repository/webhook.repository';

@Injectable()
export class WebhookService {
  constructor(private readonly webhookRepository: CallTouchWebhookRepository) {}
  processIncommingWebhook(incommingWebhookDto: IncommingCalltouchWebhookDto) {
    try {
      if (
        incommingWebhookDto.leadtype === 'call' &&
        incommingWebhookDto.callphase === 'callconnected'
      )
        return '';

      return this.webhookRepository.post(incommingWebhookDto);
    } catch (error) {
      Logger.error(error.message, 'WebhookService.processIncommingWebhook');
      throw new HttpException(
        {
          reason: 'WebhookService.processIncommingWebhook',
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errorText: (<Error>error).message,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
