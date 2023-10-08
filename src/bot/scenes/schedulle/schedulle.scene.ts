import { Action, Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { restScheduleButtons } from '@/bot/utils/buttons';
import { ConfigService } from '@nestjs/config';
import { MedicalRequestService } from '@/medical_request/medical_request.service';
import { fromEmployersRequests } from '@/bot/utils/templates';
import * as fs from 'fs';
import { Context } from 'telegraf';
import { allowedNames } from '@/utils/files.utils';
import { dayjs } from '@/core';
import {
  MedicalRequestsToTgMedicalRequests,
  TgMedicalRequestsToEmployersWithRequestsMapper,
} from '@/bot/mappers';
import { Logger } from '@nestjs/common';
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
  async onRestScheduleToday(@Ctx() ctx: SceneContext) {
    try {
      const startDate = dayjs().startOf('d');
      const endDate = dayjs().endOf('d');

      const requests = await this.medicalRequestService
        .findByParams({
          startDate: startDate.toDate(),
          endDate: endDate.toDate(),
        })
        .then((resp) => new MedicalRequestsToTgMedicalRequests(resp).mapTo());
      console.log(requests);

      const employersWithRequests =
        new TgMedicalRequestsToEmployersWithRequestsMapper(requests).mapTo();
      console.log(employersWithRequests);

      ctx.sendMessage(
        `⌛️Расписание на ${startDate.format('DD.MM.YYYY')}\n\n` +
          fromEmployersRequests(employersWithRequests),
        {
          parse_mode: 'HTML',
        },
      );
    } catch (er) {
      Logger.error(er.message, 'TGSchedulleScene.onRestScheduleToday');
    }
  }
  @Action('rest_schedule_tomorrow')
  async onRestScheduleTomorrow(@Ctx() ctx: SceneContext) {
    try {
      const startDate = dayjs().add(1, 'd').startOf('d');
      const endDate = dayjs().add(1, 'd').endOf('d');
      const requests = await this.medicalRequestService
        .findByParams({
          startDate: startDate.toDate(),
          endDate: endDate.toDate(),
        })
        .then((resp) => new MedicalRequestsToTgMedicalRequests(resp).mapTo());
      const employersWithRequests =
        new TgMedicalRequestsToEmployersWithRequestsMapper(requests).mapTo();
      ctx.sendMessage(
        `⌛️Расписание на ${startDate.format('DD.MM.YYYY')}\n\n` +
          fromEmployersRequests(employersWithRequests),
        {
          parse_mode: 'HTML',
        },
      );
    } catch (er) {
      Logger.error(er.message, 'TGSchedulleScene.onRestScheduleTomorrow');
    }
  }
  @Action('schedule_today')
  async onScheduleToday(@Ctx() ctx: SceneContext) {
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
      Logger.error(er.message, 'TGSchedulleScene.onScheduleToday');
    }
  }

  @Action('schedule_tomorrow')
  async onScheduleTomorrow(@Ctx() ctx: SceneContext) {
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
      Logger.error(er.message, 'TGSchedulleScene.onScheduleTomorrow');
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
