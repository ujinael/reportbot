import { Module } from '@nestjs/common';
import { MedicalRequestService } from './medical_request.service';
import { MedicalRequestController } from './medical_request.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpOneSConfigService } from '@/http';
import { MedicalRequestUmcApiRepository } from './repository';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpOneSConfigService,
    }),
  ],
  controllers: [MedicalRequestController],
  providers: [MedicalRequestUmcApiRepository, MedicalRequestService],
  exports: [MedicalRequestService],
})
export class MedicalRequestModule {}
