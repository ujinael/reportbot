import { Module } from '@nestjs/common';
import { DayReportService } from './report.service';
import { MedicalRequestModule } from 'src/medical_request/medical_request.module';
@Module({
  imports: [MedicalRequestModule],
  providers: [DayReportService],
})
export class ReportModule {}
