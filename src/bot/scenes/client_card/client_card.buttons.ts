import { Markup } from 'telegraf';

export const clientActions = () => {
  return Markup.inlineKeyboard([
    Markup.button.callback('Загрузить фото', 'upload_photo'),
    Markup.button.callback('Показать фото', 'all_photo'),
  ]);
};
