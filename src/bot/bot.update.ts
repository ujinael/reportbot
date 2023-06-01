import {
  Action,
  Command,
  Ctx,
  InlineQuery,
  Message,
  Start,
  Update,
} from 'nestjs-telegraf';
import { TelegrafContext } from './entities/telegraf_context.entity';
import { actionButtons } from './utils/buttons';
import { SceneContext } from 'telegraf/typings/scenes';
@Update()
export class TgBotUpdate {
  @Start()
  async start(@Ctx() ctx: TelegrafContext) {
    await ctx.reply(
      'Приветствую, я чат бот клиники, в конце смены вы будете получать отчеты',
    );
  }
  @Action('tasks_btn')
  async onTasksBtn(
    @Ctx() ctx: SceneContext,
    @Message() msg: Record<string | symbol, any>,
  ) {
    try {
      // await ctx.deleteMessage(msg.id);
      await ctx.scene.enter('tasksScene');
    } catch (error) {}
  }
  @Action('transactions_btn')
  async onTransactionsBtn(
    @Ctx() ctx: SceneContext,
    @Message() msg: Record<string | symbol, any>,
  ) {
    try {
      await ctx.scene.enter('transactionsScene');
    } catch (error) {}
  }

  @Command('menu')
  async onMenu(
    @Ctx() ctx: SceneContext,
    @Message() msg: Record<string | symbol, any>,
  ) {
    try {
      ctx.deleteMessage(msg.id);
      console.log(msg.chat.id);

      //   await ctx.reply('Выберите пункт', actionButtons());
    } catch (error) {}
  }
  @InlineQuery('tasks')
  async onInlineTasks(@Ctx() ctx: SceneContext) {
    await ctx.answerInlineQuery([
      {
        id: ctx.inlineQuery.id,
        type: 'article',
        title: 'Oki',
        input_message_content: {
          message_text: 'Hurra',
        },
        description: 'Tada',
      },

      {
        id: ctx.inlineQuery.id + 1,
        type: 'article',
        title: 'One more thing',
        input_message_content: {
          message_text:
            'File change detected. Starting incremental compilation...',
        },
        reply_markup: {
          inline_keyboard: [[{ switch_inline_query: '', text: 'Oki' }]],
        },
      },
    ]);
  }
}
