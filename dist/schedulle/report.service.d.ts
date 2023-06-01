import { ConfigService } from '@nestjs/config';
import { TelegrafContext } from 'src/bot/entities/telegraf_context.entity';
import { Telegraf } from 'telegraf';
export declare class DayReportService {
    private bot;
    private readonly configService;
    constructor(bot: Telegraf<TelegrafContext>, configService: ConfigService);
    private readonly logger;
    handleCron(): Promise<void>;
}
