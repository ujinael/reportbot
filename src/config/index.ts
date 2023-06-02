export default () => ({
  port: +process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  botToken: process.env.BOT_TOKEN,
  report: {
    reportChatId: process.env.REPORT_CHAT_ID,
    employersChatId: process.env.EMPLOYERS_CHAT_ID,
    testChatId: process.env.TEST_CHAT_ID,
    reportPath: process.env.REPORT_PATH,
  },
});
