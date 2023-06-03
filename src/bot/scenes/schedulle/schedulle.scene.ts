import { Action, Ctx, Message, Scene, SceneEnter } from 'nestjs-telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { restScheduleButtons } from 'src/bot/utils/buttons';
import { ConfigService } from '@nestjs/config';
import { MedicalRequestService } from 'src/medical_request/medical_request.service';
import { fromEmployersRequests } from 'src/bot/utils/templates';
import * as fs from 'fs';
import { Context } from 'telegraf';
import { allowedNames } from 'src/utils/files.utils';
@Scene('schedulleScene')
export class TGSchedulleScene {
  constructor(
    private readonly configService: ConfigService,
    private readonly medicalRequestService: MedicalRequestService,
  ) {}
  @SceneEnter()
  async enter(@Ctx() ctx: SceneContext) {
    ctx.reply('Выберите период', restScheduleButtons());
  }
  @Action('rest_schedule_today')
  async onRestScheduleToday(
    @Ctx() ctx: SceneContext,
    @Message() msg: Record<string | symbol, any>,
  ) {
    try {
      const startDate = new Date(2023, 3, 30);
      startDate.setUTCHours(1, 0, 0, 0);
      const endDate = new Date(startDate.getTime());
      endDate.setUTCHours(21, 0, 59, 0);

      const requests = await this.medicalRequestService.findByParams({
        startDate,
        endDate,
      });
      const employers = this.medicalRequestService.groupByEmployer(requests);
      ctx.sendMessage(
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
  @Action('rest_schedule_tomorrow')
  async onRestScheduleTomorrow(
    @Ctx() ctx: SceneContext,
    @Message() msg: Record<string | symbol, any>,
  ) {
    try {
      const startDate = new Date(new Date(2023, 3, 30).getTime() + 864e5);
      startDate.setUTCHours(1, 0, 0, 0);
      const endDate = new Date(startDate.getTime());
      endDate.setUTCHours(21, 0, 59, 0);
      const requests = await this.medicalRequestService.findByParams({
        startDate,
        endDate,
      });
      const employers = this.medicalRequestService.groupByEmployer(requests);
      ctx.sendMessage(
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
  @Action('schedule_today')
  async onScheduleToday(
    @Ctx() ctx: SceneContext,
    @Message() msg: Record<string | symbol, any>,
  ) {
    try {
      if (ctx.callbackQuery.message)
        await ctx.deleteMessage(ctx.callbackQuery.message.message_id);

      const dirPath = this.configService.get<string>('report.reportPath');
      const url = new URL(dirPath);
      fs.readdir(url, (err, files) => {
        if (err) throw err;
        ctx.sendMessage(`Расписание на сегодня`);
        files.forEach((file) => {
          if (allowedNames(['schedule_today'], file)) {
            this.sendFile(dirPath, file, ctx);
          }
        });
      });
    } catch (er) {
      console.log(er);
    }
  }

  @Action('schedule_tomorrow')
  async onScheduleTomorrow(
    @Ctx() ctx: SceneContext,
    @Message() msg: Record<string | symbol, any>,
  ) {
    try {
      if (ctx.callbackQuery.message)
        await ctx.deleteMessage(ctx.callbackQuery.message.message_id);

      const dirPath = this.configService.get<string>('report.reportPath');
      const url = new URL(dirPath);
      fs.readdir(url, async (err, files) => {
        if (err) throw err;
        await ctx.sendMessage(`Расписание на завтра`);
        files.forEach((file) => {
          if (allowedNames(['schedule_tomorrow'], file)) {
            this.sendFile(dirPath, file, ctx);
          }
        });
      });
    } catch (er) {
      console.log(er);
    }
  }
  sendFile(dirPath: string, fileName: string, ctx: Context) {
    fs.readFile(new URL(dirPath + fileName), (err, data) => {
      if (err) throw err;
      ctx.sendDocument({
        source: data,
        filename: `${new Date().toLocaleDateString(undefined, {
          dateStyle: 'short',
        })}_${fileName}`,
      });
    });
  }
}
