import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { IncommingCalltouchWebhookDto } from './dto/incomming-webhook.dto';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}
  @HttpCode(HttpStatus.OK)
  @Post()
  processIncommingWebhook(
    @Body() createWebhookDto: IncommingCalltouchWebhookDto,
  ) {
    return this.webhookService.processIncommingWebhook(createWebhookDto);
  }
}
