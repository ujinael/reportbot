import { Markup } from 'telegraf';

export const restScheduleButtons = () => {
  return Markup.inlineKeyboard([
    Markup.button.callback('Cегодня', 'rest_schedule_today'),
    Markup.button.callback('Завтра', 'rest_schedule_tomorrow'),
  ]);
};
export const schedulleButtons = () => {
  return Markup.inlineKeyboard([
    Markup.button.callback('Cегодня', 'schedule_today'),
    Markup.button.callback('Завтра', 'schedule_tomorrow'),
  ]);
};

export const registrationButtons = () => {
  return Markup.inlineKeyboard([
    Markup.button.callback('Зарегистрироваться', 'registration_action'),
  ]);
};
