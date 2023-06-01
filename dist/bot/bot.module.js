"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TgBotModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TgBotModule = void 0;
const nestjs_telegraf_1 = require("nestjs-telegraf");
const common_1 = require("@nestjs/common");
const session_middleware_1 = require("./middlewares/session.middleware");
const bot_update_1 = require("./bot.update");
let TgBotModule = TgBotModule_1 = class TgBotModule {
};
TgBotModule = TgBotModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_telegraf_1.TelegrafModule.forRootAsync({
                useFactory: () => ({
                    token: process.env.BOT_TOKEN,
                    middlewares: [session_middleware_1.SessionMiddleware],
                    include: [TgBotModule_1],
                }),
            }),
        ],
        providers: [bot_update_1.TgBotUpdate],
    })
], TgBotModule);
exports.TgBotModule = TgBotModule;
//# sourceMappingURL=bot.module.js.map