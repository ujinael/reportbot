import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { InjectBot } from 'nestjs-telegraf';
import { TelegrafContext } from 'src/bot/entities/telegraf_context.entity';
import { Telegraf } from 'telegraf';
import * as fs from 'fs';

@Injectable()
export class DayReportService {
  constructor(
    @InjectBot() private bot: Telegraf<TelegrafContext>,
    private readonly configService: ConfigService,
  ) {}
  private readonly logger = new Logger(DayReportService.name);

  @Cron('00 05 20 * * *')
  async handleCron() {
    try {
      const chatId = this.configService.get<string>('report.chatId');
      const filePath = this.configService.get<string>('report.reportPath');
      this.bot.telegram.sendMessage(chatId, new Date().toISOString());
      this.bot.telegram.sendDocument(chatId, {
        source: fs.readFileSync(filePath),
        filename: `${new Date().toLocaleDateString('ru_RU', {
          dateStyle: 'medium',
        })}_report.xlsx`,
      });
      this.logger.debug(
        `Report for ${new Date().toLocaleDateString('ru_RU', {
          dateStyle: 'medium',
        })} is sending`,
      );
    } catch (error) {
      new Logger((<Error>error).message);
    }
  }
}
