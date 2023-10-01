import { PropsType } from '@/core';

export const LeadType = {
  REQUEST: 'request',
  CALL: 'call',
} as const;

export type LeadType = PropsType<typeof LeadType>;
export interface ILead {
  type: LeadType;
  date: Date;
  clientFio?: string;
  clientPhoneNumber: string;
  clientEmail: string;
}
export type YandexDirect = {
  campaignId: 32515134;
  adGroupId: 325245212134;
  adId: 2546356252;
  criteriaId: 254251323;
};
export type GoogleAdWords = {
  campaignId: 35635656;
  adGroupId: 134524245;
  creativeId: 23134141;
  criteriaId: 4324553542;
};
export interface ICallTouchLead {
  ctClientId: number;
  date: number | string;
  dateStr?: string;
  siteId: number;
  yandexDirect: null | YandexDirect;
  googleAdWords: null | GoogleAdWords;
  orders: Array<any>;
}
