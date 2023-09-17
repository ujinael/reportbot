import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpCallTouchConfigService } from 'src/http';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpCallTouchConfigService,
    }),
  ],
  controllers: [RequestsController],
  providers: [RequestsService],
  exports: [RequestsService],
})
export class RequestsModule {}
