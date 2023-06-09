import { Module } from '@nestjs/common';
import { MedicalRequestService } from './medical_request.service';
import { MedicalRequestController } from './medical_request.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpConfigService } from 'src/http';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
  ],

  controllers: [MedicalRequestController],
  providers: [MedicalRequestService],
  exports: [MedicalRequestService],
})
export class MedicalRequestModule {}
