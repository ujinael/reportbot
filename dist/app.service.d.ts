import { Telegraf } from 'telegraf';
import { TelegrafContext } from './bot/entities/telegraf_context.entity';
export declare class AppService {
    private bot;
    constructor(bot: Telegraf<TelegrafContext>);
    getHello(): string;
}
