import { TelegrafModule } from 'nestjs-telegraf';
import { Module } from '@nestjs/common';
import { SessionMiddleware } from './middlewares/session.middleware';
import { TgBotUpdate } from './bot.update';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [SessionMiddleware],
        include: [TgBotModule],
      }),
    }),
  ],
  providers: [TgBotUpdate],
})
export class TgBotModule {}
