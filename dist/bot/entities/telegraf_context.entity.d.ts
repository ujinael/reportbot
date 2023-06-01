import { Context } from 'telegraf';
export interface TelegrafContext extends Context {
    sessions: Array<any>;
}
