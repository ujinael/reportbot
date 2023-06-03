import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, Interval } from '@nestjs/schedule';
import { InjectBot } from 'nestjs-telegraf';
import { TelegrafContext } from 'src/bot/entities/telegraf_context.entity';
import { Telegraf } from 'telegraf';
import * as fs from 'fs';
import { allowedNames } from 'src/utils/files.utils';
import { MedicalRequestService } from '../medical_request/medical_request.service';
import { fromEmployersRequests } from 'src/bot/utils/templates';

@Injectable()
export class DayReportService {
  constructor(
    @InjectBot() private bot: Telegraf<TelegrafContext>,
    private readonly configService: ConfigService,
    private readonly medicalRequestService: MedicalRequestService,
  ) {}
  private readonly logger = new Logger(DayReportService.name);

  @Cron('00 10 20 * * *')
  async handleCron() {
    try {
      const chatId = this.configService.get<string>('report.reportChatId');
      const dirPath = this.configService.get<string>('report.reportPath');
      const url = new URL(dirPath);
      fs.readdir(url, (err, files) => {
        if (err) throw err;
        this.bot.telegram.sendMessage(
          chatId,
          `Отчет за ${new Date().toLocaleDateString(undefined, {
            dateStyle: 'short',
          })}`,
        );
        files.forEach((file) => {
          if (allowedNames(['sales_report', 'Сводный'], file)) {
            this.sendFile(dirPath, file, chatId);
          }
        });
      });
    } catch (er) {
      console.log(er);
    }
  }

  @Cron('00 50 19 * * *')
  async scheduleCron() {
    try {
      const chatId = this.configService.get<string>('report.employersChatId');
      const startDate = new Date(new Date().getTime() + 864e5);
      startDate.setUTCHours(1, 0, 0, 0);
      const endDate = new Date(startDate.getTime());
      endDate.setUTCHours(21, 0, 59, 0);
      const requests = await this.medicalRequestService.findByParams({
        startDate,
        endDate,
      });
      const employers = this.medicalRequestService.groupByEmployer(requests);
      this.bot.telegram.sendMessage(
        chatId,
        `⌛️Расписание на ${startDate.toLocaleDateString(undefined, {
          dateStyle: 'short',
        })}\n\n` + fromEmployersRequests(employers),
        {
          parse_mode: 'HTML',
        },
      );
    } catch (er) {
      console.log(er);
    }
  }

  // @Interval(15000)
  async handleTest() {
    try {
      const chatId = this.configService.get<string>('report.testChatId');
      const startDate = new Date(new Date().getTime() + 864e5);
      startDate.setUTCHours(1, 0, 0, 0);
      const endDate = new Date(startDate.getTime());
      endDate.setUTCHours(21, 0, 59, 0);
      const requests = await this.medicalRequestService.findByParams({
        startDate,
        endDate,
      });
      const employers = this.medicalRequestService.groupByEmployer(requests);
      this.bot.telegram.sendMessage(
        chatId,
        `⌛️Расписание на ${startDate.toLocaleDateString(undefined, {
          dateStyle: 'short',
        })}\n\n` + fromEmployersRequests(employers),
        {
          parse_mode: 'HTML',
        },
      );
    } catch (er) {
      console.log(er);
    }
  }

  sendFile(dirPath: string, fileName: string, chatId: string) {
    fs.readFile(new URL(dirPath + fileName), (err, data) => {
      if (err) throw err;
      this.bot.telegram.sendDocument(chatId, {
        source: data,
        filename: `${new Date().toLocaleDateString(undefined, {
          dateStyle: 'short',
        })}_${fileName}`,
      });
    });
  }
}
