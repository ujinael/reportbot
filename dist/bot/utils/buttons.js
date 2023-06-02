"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionButtons2 = exports.ownerButtons = exports.registratorButtons = exports.defaultButtons = exports.schedulleButtons = exports.actionButtons = void 0;
const telegraf_1 = require("telegraf");
const actionButtons = () => {
    return telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback('задачи', 'tasks_btn'),
        telegraf_1.Markup.button.callback('транзакции', 'transactions_btn'),
    ]);
};
exports.actionButtons = actionButtons;
const schedulleButtons = () => {
    return telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback('Cегодня', 'schedule_today'),
        telegraf_1.Markup.button.callback('Завтра', 'schedule_tomorrow'),
    ]);
};
exports.schedulleButtons = schedulleButtons;
const defaultButtons = () => {
    return telegraf_1.Markup.inlineKeyboard([]);
};
exports.defaultButtons = defaultButtons;
const registratorButtons = () => {
    return telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback('транзакции', 'transactions_btn'),
    ]);
};
exports.registratorButtons = registratorButtons;
const ownerButtons = () => {
    return telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback('транзакции', 'transactions_btn'),
    ]);
};
exports.ownerButtons = ownerButtons;
const actionButtons2 = () => {
    return telegraf_1.Markup.keyboard([
        telegraf_1.Markup.button.callback('Foo', 'list'),
        telegraf_1.Markup.button.callback('Bar', 'test'),
        telegraf_1.Markup.button.webApp('наномед', 'https://www.nanomed.center'),
    ], {
        columns: 2,
    });
};
exports.actionButtons2 = actionButtons2;
//# sourceMappingURL=buttons.js.map