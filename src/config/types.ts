import { SourceKey } from '@/core';

export interface IConfig {
  port: number;
  jwt: {
    secret: string;
  };
  botToken: string;
  api: {
    host: string;
    authString: string;
  };
  report: {
    allowReports: boolean;
    reportChatId: string;
    employersChatId: string;
    testChatId: string;
    reportPath: string;
  };
  calltouch: {
    clientId: string;
    token: string;
    counter: string;
    host: string;
  };
  database: {
    database: string;
    username: string;
    password: string;
    host: string;
    port: number;
  };
}

export type ServiceType = Record<SourceKey<IConfig>, unknown>;
