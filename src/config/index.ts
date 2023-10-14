import { IConfig } from './types';
const configFunction = async (): Promise<IConfig> => ({
  port: +process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  botToken: process.env.BOT_TOKEN,
  api: {
    host: process.env.API_HOST,
    authString: process.env.API_AUTH_STRING,
  },
  report: {
    allowReports: process.env.ALLOW_REPORTS
      ? Boolean(+process.env.ALLOW_REPORTS)
      : false,
    reportChatId: process.env.REPORT_CHAT_ID,
    employersChatId: process.env.EMPLOYERS_CHAT_ID,
    testChatId: process.env.TEST_CHAT_ID,
    reportPath: process.env.REPORT_PATH,
  },
  calltouch: {
    clientId: process.env.CALLTOUCH_CLIENT_ID,
    token: process.env.CALLTOUCH_TOKEN,
    counter: process.env.CALLTOUCH_COUNTER,
    host: process.env.CALLTOUCH_HOST,
  },
  database: {
    database: process.env.POSTGRESS_DB ?? '',
    username: process.env.POSTGRESS_USERNAME ?? 'postgress',
    password: process.env.POSTGRESS_PASSWORD ?? '',
    host: process.env.POSTGRESS_HOST ?? 'localhost',
    port: +process.env.POSTGRESS_PORT ?? 5432,
  },
});

export default configFunction;
