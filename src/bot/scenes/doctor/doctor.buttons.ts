import { Markup } from 'telegraf';

export const doctorSceneButtons = () => {
  return Markup.inlineKeyboard([
    Markup.button.callback('Мои заявки', 'my_request_action'),
    Markup.button.callback('Карта пациента', 'patient_card_action'),
  ]);
};
export const doctorRequestButtons = () => {
  return Markup.inlineKeyboard([
    Markup.button.callback('Сегодня', 'schedule_today'),
    Markup.button.callback('Завтра', 'schedule_tomorrow'),
  ]);
};

