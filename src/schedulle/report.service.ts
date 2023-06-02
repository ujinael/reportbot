import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, Interval } from '@nestjs/schedule';
import { InjectBot } from 'nestjs-telegraf';
import { TelegrafContext } from 'src/bot/entities/telegraf_context.entity';
import { Telegraf } from 'telegraf';
import * as fs from 'fs';
import { allowedNames } from 'src/utils/files.utils';

@Injectable()
export class DayReportService {
  constructor(
    @InjectBot() private bot: Telegraf<TelegrafContext>,
    private readonly configService: ConfigService,
  ) { }
  private readonly logger = new Logger(DayReportService.name);

  @Cron('00 10 20 * * *')
  async handleCron() {
    try {
      const chatId = this.configService.get<string>('report.reportChatId');
      const dirPath = this.configService.get<string>('report.reportPath');
      const url = new URL(dirPath)
      fs.readdir(url, (err, files) => {
        if (err) throw err
        this.bot.telegram.sendMessage(chatId, `Отчет за ${new Date().toLocaleDateString(undefined, { dateStyle: 'short' })}`)
        files.forEach(file => {
          if (allowedNames(['sales_report', 'Сводный'], file)) {
            this.sendFile(dirPath, file, chatId)
          }
        })

      })
    }
    catch (er) {
      console.log(er);

    }
  }

  @Cron('00 50 19 * * *')
  async scheduleCron() {
    try {
      const chatId = this.configService.get<string>('report.employersChatId');
      const dirPath = this.configService.get<string>('report.reportPath');
      const url = new URL(dirPath)
      fs.readdir(url, (err, files) => {
        if (err) throw err
        this.bot.telegram.sendMessage(chatId, `Расписание на завтра`)
        files.forEach(file => {
          if (allowedNames(['schedule_tomorrow'], file)) {
            this.sendFile(dirPath, file, chatId)
          }
        })

      })
    }
    catch (er) {
      console.log(er);

    }
  }


  // @Interval(15000)
  async handleTest() {
    try {
      const chatId = this.configService.get<string>('report.testChatId');
      const dirPath = this.configService.get<string>('report.reportPath');
      const url = new URL(dirPath)
      fs.readdir(url, (err, files) => {
        if (err) throw err
        files.forEach(file => {
          if (allowedNames(['schedule_today'], file)) {
            this.sendFile(dirPath, file, chatId)
          }
        })

      })
    }
    catch (er) {
      console.log(er);

    }
  }

  sendFile(dirPath: string, fileName: string, chatId: string) {
    fs.readFile(new URL(dirPath + fileName), ((err, data) => {
      if (err) throw err
      this.bot.telegram.sendDocument(chatId, {
        source: data,
        filename: `${new Date().toLocaleDateString(undefined, {
          dateStyle: 'short',
        })}_${fileName}`,
      });

    })
    )

  }
}
