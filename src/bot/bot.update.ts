import { Command, Ctx, Message, Start, Update } from 'nestjs-telegraf';
import { TelegrafContext } from './entities/telegraf_context.entity';
import { SceneContext } from 'telegraf/typings/scenes';
import { ConfigService } from '@nestjs/config';
@Update()
export class TgBotUpdate {
  constructor(private readonly configService: ConfigService) {}
  @Start()
  async start(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('Приветствую, я чат бот клиники');
  }
  @Command('menu')
  async onMenu(
    @Ctx() ctx: SceneContext,
    @Message() msg: Record<string | symbol, any>,
  ) {
    try {
      await ctx.deleteMessage(msg.id);
      const testChatId = this.configService.get<string>('report.testChatId');
      const reportChatId = this.configService.get<string>(
        'report.reportChatId',
      );
      const employersChatId = this.configService.get<string>(
        'report.employersChatId',
      );
      if (ctx.chat.id === +employersChatId) {
        await ctx.scene.enter('schedulleScene');
      }
      if (ctx.chat.id === +testChatId) {
        await ctx.scene.enter('schedulleScene');
      }
    } catch (error) {}
  }
}
