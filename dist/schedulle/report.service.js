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
var DayReportService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayReportService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const nestjs_telegraf_1 = require("nestjs-telegraf");
const telegraf_1 = require("telegraf");
const fs = require("fs");
let DayReportService = DayReportService_1 = class DayReportService {
    constructor(bot, configService) {
        this.bot = bot;
        this.configService = configService;
        this.logger = new common_1.Logger(DayReportService_1.name);
    }
    async handleCron() {
        try {
            const chatId = this.configService.get('report.chatId');
            const filePath = this.configService.get('report.reportPath');
            this.bot.telegram.sendMessage(chatId, new Date().toISOString());
            this.bot.telegram.sendDocument(chatId, {
                source: fs.readFileSync(filePath),
                filename: `${new Date().toLocaleDateString('ru_RU', {
                    dateStyle: 'medium',
                })}_report.xlsx`,
            });
            this.logger.debug(`Report for ${new Date().toLocaleDateString('ru_RU', {
                dateStyle: 'medium',
            })} is sending`);
        }
        catch (error) {
            new common_1.Logger(error.message);
        }
    }
};
__decorate([
    (0, schedule_1.Cron)('00 05 20 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DayReportService.prototype, "handleCron", null);
DayReportService = DayReportService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_telegraf_1.InjectBot)()),
    __metadata("design:paramtypes", [telegraf_1.Telegraf,
        config_1.ConfigService])
], DayReportService);
exports.DayReportService = DayReportService;
//# sourceMappingURL=report.service.js.map