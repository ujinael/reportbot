"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TgBotUpdate = void 0;
const nestjs_telegraf_1 = require("nestjs-telegraf");
const fs = require("fs");
const buttons_1 = require("./utils/buttons");
const config_1 = require("@nestjs/config");
const files_utils_1 = require("../utils/files.utils");
let TgBotUpdate = class TgBotUpdate {
    constructor(configService) {
        this.configService = configService;
    }
    async start(ctx) {
        await ctx.reply('Приветствую, я чат бот клиники');
    }
    async onScheduleToday(ctx, msg) {
        try {
            if (ctx.callbackQuery.message)
                await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
            const dirPath = this.configService.get('report.reportPath');
            const url = new URL(dirPath);
            fs.readdir(url, (err, files) => {
                if (err)
                    throw err;
                ctx.sendMessage(`Расписание на сегодня`);
                files.forEach(file => {
                    if ((0, files_utils_1.allowedNames)(['schedule_today'], file)) {
                        this.sendFile(dirPath, file, ctx);
                    }
                });
            });
        }
        catch (er) {
            console.log(er);
        }
    }
    async onScheduleTomorrow(ctx, msg) {
        try {
            if (ctx.callbackQuery.message)
                await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
            const dirPath = this.configService.get('report.reportPath');
            const url = new URL(dirPath);
            fs.readdir(url, async (err, files) => {
                if (err)
                    throw err;
                await ctx.sendMessage(`Расписание на завтра`);
                files.forEach(file => {
                    if ((0, files_utils_1.allowedNames)(['schedule_tomorrow'], file)) {
                        this.sendFile(dirPath, file, ctx);
                    }
                });
            });
        }
        catch (er) {
            console.log(er);
        }
    }
    async onMenu(ctx, msg) {
        try {
            await ctx.deleteMessage(msg.id);
            const testChatId = this.configService.get("report.testChatId");
            const reportChatId = this.configService.get("report.reportChatId");
            const employersChatId = this.configService.get("report.employersChatId");
            if (ctx.chat.id === +employersChatId) {
                await ctx.reply('Выберите расписание', (0, buttons_1.schedulleButtons)());
            }
        }
        catch (error) { }
    }
    sendFile(dirPath, fileName, ctx) {
        fs.readFile(new URL(dirPath + fileName), ((err, data) => {
            if (err)
                throw err;
            ctx.sendDocument({
                source: data,
                filename: `${new Date().toLocaleDateString(undefined, {
                    dateStyle: 'short',
                })}_${fileName}`,
            });
        }));
    }
};
__decorate([
    (0, nestjs_telegraf_1.Start)(),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TgBotUpdate.prototype, "start", null);
__decorate([
    (0, nestjs_telegraf_1.Action)('schedule_today'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __param(1, (0, nestjs_telegraf_1.Message)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TgBotUpdate.prototype, "onScheduleToday", null);
__decorate([
    (0, nestjs_telegraf_1.Action)('schedule_tomorrow'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __param(1, (0, nestjs_telegraf_1.Message)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TgBotUpdate.prototype, "onScheduleTomorrow", null);
__decorate([
    (0, nestjs_telegraf_1.Command)('menu'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __param(1, (0, nestjs_telegraf_1.Message)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TgBotUpdate.prototype, "onMenu", null);
TgBotUpdate = __decorate([
    (0, nestjs_telegraf_1.Update)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TgBotUpdate);
exports.TgBotUpdate = TgBotUpdate;
//# sourceMappingURL=bot.update.js.map