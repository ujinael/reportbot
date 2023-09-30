import { Module } from '@nestjs/common';
import { CallsService } from './calls.service';
import { CallsController } from './calls.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpCallTouchConfigService } from 'src/http';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallTouchPhoneCall } from './entities/phonecall.entity';
import { CallTouchApiPhoneCallRepository } from './repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CallTouchPhoneCall]),
    HttpModule.registerAsync({
      useClass: HttpCallTouchConfigService,
    }),
  ],
  controllers: [CallsController],
  providers: [CallTouchApiPhoneCallRepository, CallsService],
  exports: [CallsService],
})
export class CallsModule {}
