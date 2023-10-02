import { UserService } from './../../../user/user.service';
import { Action, Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { MedicalRequestService } from 'src/medical_request/medical_request.service';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
@Scene('uploadPhotoScene')
export class TGUploadPhotoScene {
  constructor(
    private readonly configService: ConfigService,
    private readonly medicalRequestService: MedicalRequestService,
    private readonly userService: UserService,
    private readonly httpService: HttpService,
  ) {}
  @SceneEnter()
  async enter(@Ctx() ctx: SceneContext) {
    try {
      const currentUser = await this.userService.findOneTelegramId(ctx.from.id);
      if (!currentUser || !currentUser.employerId)
        await ctx.sendMessage('Ожидание подтверждения от админа');
      else {
        ctx.scene.state['employerId'] = currentUser.employerId;
      }
      ctx.sendMessage('Загрузите фото');
    } catch (error) {
      Logger.error(error.message, 'TGUploadPhotoScene.enter');
    }
  }
  @On('photo')
  async onUploadPhoto(ctx: SceneContext) {
    try {
      const clientId = ctx.scene.state['clientId'];
      //@ts-ignore
      const file_id = ctx.message.photo.pop().file_id;
      const dirPath = this.configService.get<string>('report.reportPath');
      const fileLink = await ctx.telegram.getFileLink(file_id);

      const fileName =
        dirPath +
        clientId +
        '-' +
        Date.now() +
        '.' +
        fileLink.href.split('.').pop();
      const urlFilePath = new URL(fileName);

      // путь к файлу на сервере Telegram
      const fileStream = fs.createWriteStream(urlFilePath);
      const data = await lastValueFrom(
        this.httpService.get(fileLink.href, {
          responseType: 'stream',
        }),
      ).then((resp) => resp.data);
      data.pipe(fileStream);
      await ctx.reply(`Фото сохранено!`);
      await ctx.scene.leave();
    } catch (e) {
      ctx.reply(`Ошибка сохранения файла ${e.message}`);
    }
  }
}
