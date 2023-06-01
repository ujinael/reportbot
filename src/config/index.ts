export default () => ({
  port: +process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  botToken: process.env.BOT_TOKEN,
  report: {
    chatId: process.env.REPORT_CHAT_ID,
    reportPath: process.env.REPORT_PATH,
  },
});
