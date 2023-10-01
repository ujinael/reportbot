import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpCallTouchConfigService } from '@/http';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallTouchRequest } from './entities/request.entity';
import { CallTouchRequestClient } from './entities/request_client.entity';
import { CallTouchRequestSession } from './entities/request_session.entity';
import { RequestClientPhone } from './entities/request_client_phone.entity';
import { CallTouchApiRequestRepository } from './repository';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpCallTouchConfigService,
    }),
    TypeOrmModule.forFeature([
      CallTouchRequest,
      CallTouchRequestClient,
      CallTouchRequestSession,
      RequestClientPhone,
    ]),
  ],
  controllers: [RequestsController],
  providers: [CallTouchApiRequestRepository, RequestsService],
  exports: [RequestsService],
})
export class RequestsModule {}
