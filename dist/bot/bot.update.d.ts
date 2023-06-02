import { TelegrafContext } from './entities/telegraf_context.entity';
import { SceneContext } from 'telegraf/typings/scenes';
import { ConfigService } from '@nestjs/config';
import { Context } from 'telegraf';
export declare class TgBotUpdate {
    private readonly configService;
    constructor(configService: ConfigService);
    start(ctx: TelegrafContext): Promise<void>;
    onScheduleToday(ctx: SceneContext, msg: Record<string | symbol, any>): Promise<void>;
    onScheduleTomorrow(ctx: SceneContext, msg: Record<string | symbol, any>): Promise<void>;
    onMenu(ctx: SceneContext, msg: Record<string | symbol, any>): Promise<void>;
    sendFile(dirPath: string, fileName: string, ctx: Context): void;
}
