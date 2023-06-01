import { TelegrafContext } from './entities/telegraf_context.entity';
import { SceneContext } from 'telegraf/typings/scenes';
export declare class TgBotUpdate {
    start(ctx: TelegrafContext): Promise<void>;
    onTasksBtn(ctx: SceneContext, msg: Record<string | symbol, any>): Promise<void>;
    onTransactionsBtn(ctx: SceneContext, msg: Record<string | symbol, any>): Promise<void>;
    onMenu(ctx: SceneContext, msg: Record<string | symbol, any>): Promise<void>;
    onInlineTasks(ctx: SceneContext): Promise<void>;
}
