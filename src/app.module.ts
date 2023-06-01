import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { TgBotModule } from './bot/bot.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ReportModule } from './schedulle/report.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TgBotModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
