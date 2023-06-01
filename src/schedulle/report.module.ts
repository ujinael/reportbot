import { Module } from '@nestjs/common';
import { DayReportService } from './report.service';
@Module({
  providers: [DayReportService],
})
export class ReportModule {}
