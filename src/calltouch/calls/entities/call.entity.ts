import { ICallTouchLead } from 'src/calltouch/leads/entities/lead.entity';

export class Call implements ICallTouchLead {
  callId: string;
  callphase: string;
  attribution: number;
  callTags: Array<any>;
  date: string;
  duration: number;
  callerNumber: string;
  redirectNumber: string;
  phoneNumber: string;
  manager: string;
  successful: string;
  uniqueCall: boolean;
  targetCall: boolean;
  uniqTargetCall: boolean;
  callbackCall: boolean;
  city: string;
  source: string;
  medium: string;
  keyword: string;
  url: string;
  callUrl: string;
  ref: string;
  hostname: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  sessionId: number | null;
  ctCallerId: string;
  clientId: number | null;
  yaClientId: string;
  sipCallId: string;
  userAgent: string;
  ip: string;
  waitingConnect: number;
  callReferenceId: string;
  mapVisits: Array<any> | null;
  attrs: Array<any> | null;
  comments: Array<any> | null;
  phrases: Array<any> | null;
  additionalTags: Array<any> | null;
  callClientUniqueId: number | null;
  device: string;
  os: string;
  browser: string;
  timestamp: number;
  sessionDate: string;
  orders: Array<any>;
  order: any;
  yandexDirect: boolean;
  googleAdWords: boolean;
  siteId: number;
  siteName: string;
  callbackInfo: string;
  ctClientId: number;
  dcm: string;
  phonesInText: string;
  ctGlobalId: string | null;
  subPoolName: string | null;
  statusDetails: string;
}