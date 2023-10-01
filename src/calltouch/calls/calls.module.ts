import { Module } from '@nestjs/common';
import { CallsService } from './calls.service';
import { CallsController } from './calls.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpCallTouchConfigService } from 'src/http';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallTouchPhoneCall } from './entities/phonecall.entity';
import { CallTouchApiPhoneCallRepository } from './repository';
import { CallTouchRequestSession } from '../requests/entities/request_session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CallTouchPhoneCall, CallTouchRequestSession]),
    HttpModule.registerAsync({
      useClass: HttpCallTouchConfigService,
    }),
  ],
  controllers: [CallsController],
  providers: [CallTouchApiPhoneCallRepository, CallsService],
  exports: [CallsService],
})
export class CallsModule {}
