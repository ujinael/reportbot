import { Module } from '@nestjs/common';
import { LeadsModule } from './leads/leads.module';
import { CallsModule } from './calls/calls.module';
import { RequestsModule } from './requests/requests.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [LeadsModule, CallsModule, RequestsModule, WebhookModule],
})
export class CalltouchModule {}
