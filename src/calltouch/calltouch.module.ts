import { Module } from '@nestjs/common';
import { LeadsModule } from './leads/leads.module';
import { CallsModule } from './calls/calls.module';
import { RequestsModule } from './requests/requests.module';

@Module({
  imports: [LeadsModule, CallsModule, RequestsModule],
})
export class CalltouchModule {}
