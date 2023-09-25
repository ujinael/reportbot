import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpCallTouchConfigService } from 'src/http';
import { RequestsModule } from '../requests/requests.module';
import { CallsModule } from '../calls/calls.module';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpCallTouchConfigService,
    }),
    RequestsModule,
    CallsModule,
  ],
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class LeadsModule { }
