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
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { CalltouchModule } from './calltouch/calltouch.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${
        process.env.NODE_ENV === 'production' ? '.production' : '.development'
      }.env`,
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRESS_HOST ?? 'localhost',
      port: +process.env.POSTGRESS_PORT ?? 5432,
      username: process.env.POSTGRESS_USERNAME ?? 'postgress',
      password: process.env.POSTGRESS_PASSWORD ?? '',
      database: process.env.POSTGRESS_DB ?? '',
      entities: [User],
      synchronize: process.env.NODE_ENV === 'production' ? false : true,
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
