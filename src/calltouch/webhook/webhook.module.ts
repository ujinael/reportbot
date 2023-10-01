import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { CallTouchWebhookRepository } from './repository/webhook.repository';
import { HttpModule } from '@nestjs/axios';
import { HttpOneSConfigService } from '@/http';

@Module({
  controllers: [WebhookController],
  imports: [
    HttpModule.registerAsync({
      useClass: HttpOneSConfigService,
    }),
  ],
  providers: [CallTouchWebhookRepository, WebhookService],
})
export class WebhookModule {}
