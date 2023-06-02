import {
  Action,
  Command,
  Ctx,
  InlineQuery,
  Message,
  Start,
  Update,
} from 'nestjs-telegraf';
import * as fs from "fs"
import { TelegrafContext } from './entities/telegraf_context.entity';
import { actionButtons, schedulleButtons } from './utils/buttons';
import { SceneContext } from 'telegraf/typings/scenes';
import { ConfigService } from '@nestjs/config';
import { allowedNames } from 'src/utils/files.utils';
import { Context } from 'telegraf';
@Update()
export class TgBotUpdate {
  constructor(private readonly configService:ConfigService){}
  @Start()
  async start(@Ctx() ctx: TelegrafContext) {
    await ctx.reply(
      'Приветствую, я чат бот клиники',
    );
  }
 
  @Action('schedule_today')
  async onScheduleToday(
    @Ctx() ctx: SceneContext,
    @Message() msg: Record<string | symbol, any>,
  ) {
    try {
      if(ctx.callbackQuery.message)
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);

      const dirPath = this.configService.get<string>('report.reportPath');
      const url = new URL(dirPath)
      fs.readdir(url, (err, files) => {
        if (err) throw err
        ctx.sendMessage(`Расписание на сегодня`)
        files.forEach(file => {
          if (allowedNames(['schedule_today'], file)) {
            this.sendFile(dirPath, file,ctx)
          }
        })

      })
    }
    catch (er) {
      console.log(er);

    }
  }
  
  @Action('schedule_tomorrow')
  async onScheduleTomorrow(
    @Ctx() ctx: SceneContext,
    @Message() msg: Record<string | symbol, any>,
  ) {
    try {
      if(ctx.callbackQuery.message)
await ctx.deleteMessage(ctx.callbackQuery.message.message_id);

      const dirPath = this.configService.get<string>('report.reportPath');
      const url = new URL(dirPath)
      fs.readdir(url, async (err, files) => {
        if (err) throw err
      await  ctx.sendMessage(`Расписание на завтра`)
        files.forEach(file => {
          if (allowedNames(['schedule_tomorrow'], file)) {
            this.sendFile(dirPath, file,ctx)
          }
        })

      })
    }
    catch (er) {
      console.log(er);

    }
  }
  @Command('menu')
  async onMenu(
    @Ctx() ctx: SceneContext,
    @Message() msg: Record<string | symbol, any>,
  ) {
    try {
    await  ctx.deleteMessage(msg.id);
const testChatId = this.configService.get<string>("report.testChatId")
const reportChatId = this.configService.get<string>("report.reportChatId")
const employersChatId = this.configService.get<string>("report.employersChatId")

  // console.log(ctx.chat);
if(ctx.chat.id === +employersChatId){
  await ctx.reply('Выберите расписание', schedulleButtons());
  
}
    } catch (error) {}
  }
  sendFile(dirPath: string, fileName: string,ctx:Context) {
    fs.readFile(new URL(dirPath + fileName), ((err, data) => {
      if (err) throw err
      ctx.sendDocument({
        source: data,
        filename: `${new Date().toLocaleDateString(undefined, {
          dateStyle: 'short',
        })}_${fileName}`,
      });

    })
    )

  }
}
