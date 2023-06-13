import { Action, Command, Ctx, Message, Start, Update } from 'nestjs-telegraf';
import { TelegrafContext } from './entities/telegraf_context.entity';
import { SceneContext } from 'telegraf/typings/scenes';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { registrationButtons } from './utils/buttons';
import { UserRole } from 'src/user/entities/user.entity';
@Update()
export class TgBotUpdate {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}
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
      // await ctx.deleteMessage(msg.id);
      const testChatId = this.configService.get<string>('report.testChatId');
      const employersChatId = this.configService.get<string>(
        'report.employersChatId',
      );
      if (ctx.chat.id === +employersChatId) {
        await ctx.scene.enter('schedulleScene');
      }
      // if (ctx.chat.id === +testChatId) {
      //   await ctx.scene.enter('schedulleScene');
      // }
      const registeredUser = await this.userService.findOneTelegramId(
        ctx.from.id,
      );
      if (!registeredUser) {
        ctx.reply('Регистрация', registrationButtons());
      } else {
        switch (registeredUser.role) {
          case UserRole.DOCTOR:
            await ctx.scene.enter(`${registeredUser.role}Scene`);
            break;
          default:
            break;
        }
      }
    } catch (error) {}
  }

  @Action('registration_action')
  async onScheduleToday(@Ctx() ctx: SceneContext) {
    try {
      const registeredUser = await this.userService.findOneTelegramId(
        ctx.from.id,
      );
      if (registeredUser) return;
      const user = ctx.from;
      if (user.is_bot) return;
      await this.userService.create({
        firstName: user.first_name,
        lastName: user.last_name,
        telegramId: user.id,
      });
      ctx.reply(
        `Вы успешно зарегистрировались.\nПосле назначения вам роли администратором, вам станет доступен функционал бота`,
      );
    } catch (er) {
      console.log(er);
    }
  }
}
