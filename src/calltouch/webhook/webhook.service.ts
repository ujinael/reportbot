import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { IncommingCalltouchWebhookDto } from './dto/incomming-webhook.dto';
import { InputCallTouchDtoToOutputOneSDtoMapper } from './mapppers/input_calltouch_to_output_ones.mapper';
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
        return HttpStatus.OK;

      this.webhookRepository.post(
        new InputCallTouchDtoToOutputOneSDtoMapper(incommingWebhookDto).mapTo(),
      );
      return HttpStatus.OK;
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
