export interface ICallTouchSessionDto {
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
