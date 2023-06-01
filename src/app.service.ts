import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { TelegrafContext } from './bot/entities/telegraf_context.entity';

@Injectable()
export class AppService {
  constructor(@InjectBot() private bot: Telegraf<TelegrafContext>) {}

  getHello(): string {
    return 'Hello World!';
  }
}
