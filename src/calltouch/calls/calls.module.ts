import { Module } from '@nestjs/common';
import { CallsService } from './calls.service';
import { CallsController } from './calls.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpCallTouchConfigService } from 'src/http';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpCallTouchConfigService,
    }),
  ],
  controllers: [CallsController],
  providers: [CallsService],
  exports: [CallsService],
})
export class CallsModule {}
