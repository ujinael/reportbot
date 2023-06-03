import { TelegrafModule } from 'nestjs-telegraf';
import { Module } from '@nestjs/common';
import { SessionMiddleware } from './middlewares/session.middleware';
import { TgBotUpdate } from './bot.update';
import { MedicalRequestModule } from 'src/medical_request/medical_request.module';
import { TGSchedulleModule } from './scenes/schedulle/schedulle.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [SessionMiddleware],
        include: [TgBotModule],
      }),
    }),
    TGSchedulleModule,
    MedicalRequestModule,
  ],
  providers: [TgBotUpdate],
})
export class TgBotModule {}
