import { Module } from '@nestjs/common';
import { MedicalRequestService } from './medical_request.service';
import { MedicalRequestController } from './medical_request.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpOneSConfigService } from 'src/http';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpOneSConfigService,
    }),
  ],

  controllers: [MedicalRequestController],
  providers: [MedicalRequestService],
  exports: [MedicalRequestService],
})
export class MedicalRequestModule {}
