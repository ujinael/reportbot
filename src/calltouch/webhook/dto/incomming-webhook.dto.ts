import { PropsType } from '@/core';

export const WebhookLeadType = {
  REQUEST: 'request',
  CALL: 'call',
} as const;
export type WebhookLeadType = PropsType<typeof WebhookLeadType>;
export interface IncommingCalltouchWebhookDto {
  leadtype: WebhookLeadType;
  changedFields: null | Array<string>;
  callerphone: string;
  requestId?: string;
  requestNumber?: string;
  subject?: string;
  fio?: string;
  /**
   * 2023-09-25 23:35:16 дата создания заявки
   */
  phonenumber?: string;
  subPoolName?: string;
  redirectNumber?: string;
  duration?: string;
  waiting_time?: string;
  /**
   * 2023-09-25 23:35:16 дата начала звонка
   */
  calltime?: string;
  timestamp: string;
  status?: string;
  statusDetails?: string;
  unique?: string;
  targetcall?: string;
  uniqtargetcall?: string;
  callback?: string;
  worktime?: string;
  pool?: string;
  requestDate?: string;
  uniquerequest?: string;
  targetrequest?: string;
  uniqtargetrequest?: string;
  tags_auto_gr: string;
  tags_auto_ct: string;
  tags_auto_pn: string;
  tags_manual: string;
  tags_api: string;
  tags_request: string;
  attribution: string;
  source: string;
  medium: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  yaClientId: string;
  sessionId: string;
  ctClientId: string;
  ctGlobalId: string;
  hostname: string;
  url: string;
  attrs: string;
  ref: string;
  city: string;
  browser: string;
  os: string;
  device: string;
  ip: string;
  orderId: string;
  siteId: string;
  siteName: string;
  userAgent: string;
  sendingTimestamp: string;
  manager: string;
}
