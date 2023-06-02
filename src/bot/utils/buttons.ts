import { Markup } from 'telegraf';

export const actionButtons = () => {
  return Markup.inlineKeyboard([
    Markup.button.callback('задачи', 'tasks_btn'),
    Markup.button.callback('транзакции', 'transactions_btn'),
  ]);
};
export const schedulleButtons = () => {
  return Markup.inlineKeyboard([
    Markup.button.callback('Cегодня', 'schedule_today'),
    Markup.button.callback('Завтра', 'schedule_tomorrow'),
  ]);
};
export const defaultButtons = () => {
  return Markup.inlineKeyboard([]);
};
export const registratorButtons = () => {
  return Markup.inlineKeyboard([
    Markup.button.callback('транзакции', 'transactions_btn'),
  ]);
};
export const ownerButtons = () => {
  return Markup.inlineKeyboard([
    Markup.button.callback('транзакции', 'transactions_btn'),
  ]);
};
export const actionButtons2 = () => {
  return Markup.keyboard(
    [
      Markup.button.callback('Foo', 'list'),
      Markup.button.callback('Bar', 'test'),
      Markup.button.webApp('наномед', 'https://www.nanomed.center'),
    ],
    {
      columns: 2,
    },
  );
};
