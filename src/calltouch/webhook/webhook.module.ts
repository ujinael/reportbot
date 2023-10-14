import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { CallTouchWebhookRepository } from './repository/webhook.repository';
import { HttpModule } from '@nestjs/axios';
import { HttpOneSConfigService } from '@/http';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [WebhookController],
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useClass: HttpOneSConfigService,
    }),
  ],
  providers: [CallTouchWebhookRepository, WebhookService],
})
export class WebhookModule {}
