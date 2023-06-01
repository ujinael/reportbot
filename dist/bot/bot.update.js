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
let TgBotUpdate = class TgBotUpdate {
    async start(ctx) {
        await ctx.reply('Приветствую, я чат бот клиники, в конце смены вы будете получать отчеты');
    }
    async onTasksBtn(ctx, msg) {
        try {
            await ctx.scene.enter('tasksScene');
        }
        catch (error) { }
    }
    async onTransactionsBtn(ctx, msg) {
        try {
            await ctx.scene.enter('transactionsScene');
        }
        catch (error) { }
    }
    async onMenu(ctx, msg) {
        try {
            ctx.deleteMessage(msg.id);
            console.log(msg.chat.id);
        }
        catch (error) { }
    }
    async onInlineTasks(ctx) {
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
                    message_text: 'File change detected. Starting incremental compilation...',
                },
                reply_markup: {
                    inline_keyboard: [[{ switch_inline_query: '', text: 'Oki' }]],
                },
            },
        ]);
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
    (0, nestjs_telegraf_1.Action)('tasks_btn'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __param(1, (0, nestjs_telegraf_1.Message)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TgBotUpdate.prototype, "onTasksBtn", null);
__decorate([
    (0, nestjs_telegraf_1.Action)('transactions_btn'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __param(1, (0, nestjs_telegraf_1.Message)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TgBotUpdate.prototype, "onTransactionsBtn", null);
__decorate([
    (0, nestjs_telegraf_1.Command)('menu'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __param(1, (0, nestjs_telegraf_1.Message)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TgBotUpdate.prototype, "onMenu", null);
__decorate([
    (0, nestjs_telegraf_1.InlineQuery)('tasks'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TgBotUpdate.prototype, "onInlineTasks", null);
TgBotUpdate = __decorate([
    (0, nestjs_telegraf_1.Update)()
], TgBotUpdate);
exports.TgBotUpdate = TgBotUpdate;
//# sourceMappingURL=bot.update.js.map