import { Action, Ctx, Message, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { ClientService } from 'src/client/client.service';
import { clientActions } from './client_card.buttons';
@Scene('clientCardScene')
export class TGClientCardScene {
  constructor(
    private readonly configService: ConfigService,
    private readonly clientService: ClientService,
  ) {}
  @SceneEnter()
  async enter(@Ctx() ctx: SceneContext) {
    ctx.sendMessage('Введите ФИО пациента через пробелы');
  }
  @On('text')
  async onText(@Ctx() ctx: SceneContext, @Message() msg: Record<string, any>) {
    try {
      const client = await this.clientService.findOneByTitle(msg.text);
      ctx.scene.state['clientId'] = client.id;
      await ctx.reply(client.fullTitle, clientActions());
    } catch (error) {
      await ctx.sendMessage('Пациент не найден');
    }
  }

  @Action('upload_photo')
  async onUploadPhoto(@Ctx() ctx: SceneContext) {
    try {
      const employerId = ctx.scene.state['employerId'];
      const clientId = ctx.scene.state['clientId'];
      if (!employerId || !clientId)
        throw Error('Произошла ошибка, нажмите на меню');
      ctx.scene.enter('uploadPhotoScene', {
        employerId,
        clientId,
      });
    } catch (error) {
      ctx.sendMessage(error.message);
    }
  }
}
