import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { TgBotModule } from './bot/bot.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ReportModule } from './schedulle/report.module';
import { MedicalRequestModule } from './medical_request/medical_request.module';
import { EmployerModule } from './employer/employer.module';
import { ClientModule } from './client/client.module';
import { NomenclatureItemModule } from './nomenclature_item/nomenclature_item.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${
        process.env.NODE_ENV === 'production' ? '.production' : '.development'
      }.env`,
      load: [config],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TgBotModule,
    ReportModule,
    MedicalRequestModule,
    EmployerModule,
    ClientModule,
    NomenclatureItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
