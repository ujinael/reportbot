import { UserModule } from './../user/user.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { Module } from '@nestjs/common';
import { SessionMiddleware } from './middlewares/session.middleware';
import { TgBotUpdate } from './bot.update';
import { MedicalRequestModule } from 'src/medical_request/medical_request.module';
import { TGSchedulleModule } from './scenes/schedulle/schedulle.module';
import { TGDoctorModule } from './scenes/doctor/doctor.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [SessionMiddleware],
        include: [TgBotModule],
      }),
    }),
    UserModule,
    TGSchedulleModule,
    TGDoctorModule,
    MedicalRequestModule,
  ],
  providers: [TgBotUpdate],
})
export class TgBotModule {}
