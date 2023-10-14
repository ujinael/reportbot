import { Module } from '@nestjs/common';
import { MedicalRequestService } from './medical_request.service';
import { MedicalRequestController } from './medical_request.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpOneSConfigService } from '@/http';
import { MedicalRequestUmcApiRepository } from './repository';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useClass: HttpOneSConfigService,
    }),
  ],
  controllers: [MedicalRequestController],
  providers: [MedicalRequestUmcApiRepository, MedicalRequestService],
  exports: [MedicalRequestService],
})
export class MedicalRequestModule {}
