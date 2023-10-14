import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configFunction } from './config';
import { TgBotModule } from './bot/bot.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ReportModule } from './schedulle/report.module';
import { MedicalRequestModule } from './medical_request/medical_request.module';
import { EmployerModule } from './employer/employer.module';
import { ClientModule } from './client/client.module';
import { NomenclatureItemModule } from './nomenclature_item/nomenclature_item.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CalltouchModule } from './calltouch/calltouch.module';
import { typeOrmConfigFactory } from './database_config/type_orm_config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${
        process.env.NODE_ENV === 'production' ? '.production' : '.development'
      }.env`,
      load: [configFunction],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfigFactory,
    }),
    ScheduleModule.forRoot(),
    TgBotModule,
    ReportModule,
    MedicalRequestModule,
    EmployerModule,
    ClientModule,
    NomenclatureItemModule,
    UserModule,
    CalltouchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
