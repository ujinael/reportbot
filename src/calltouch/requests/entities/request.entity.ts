import { ICallTouchLead } from 'src/calltouch/leads/entities/lead.entity';

export interface ICallTouchSession {
  sessionId: number;
  keywords: string;
  city: string;
  ip: string;
  source: string;
  medium: string;
  ref: string;
  url: string;
  utmSource: string;
  utmMedium: string;
  utmTerm: string;
  utmContent: string;
  utmCampaign: string;
  guaClientId: string;
  sessionDate: string;
  attrs: null | Array<any>;
  attribution: 1;
  yaClientId: string;
  additionalTags: Array<string>;
  ctGlobalId: null | string;
  browser: string;
}
export interface ICallTouchClient {
  clientId: number;
  fio: string;
  phones: [
    {
      phoneNumber: string;
      phoneType: string;
    },
  ];
  contacts: Array<any>;
}

export class CallTouchRequest implements ICallTouchLead {
  date: string | number;
  comments: Array<any>;
  requestType: null | string;
  dateStr: string;
  manager: string;
  session: ICallTouchSession;
  subject: string;
  uniqTargetRequest: boolean;
  uniqueRequest: boolean;
  yandexDirect: null | boolean | string;
  googleAdWords: null | boolean | string;
  requestNumber: string;
  requestId: number;
  client: ICallTouchClient;
  siteId: number;
  orders: Array<any>;
  targetRequest: boolean;
  status: string;
  order: null | any;
  mapVisits: Array<any>;
  requestUrl: string;
  ctClientId: number;
  dcm: string | null;
  ctGlobalId: string | null;
  widgetInfo: string | null;
  RequestTags: Array<string> | null;
}
