export enum LeadType {
  REQUEST = 'request',
  CALL = 'call',
}
export interface ILead {
  type: LeadType;
  date: Date;
  clientFio?: string;
  clientPhoneNumber: string;
  clientEmail: string;
}
export interface ICallTouchLead {
  ctClientId: number;
  date: number | string;
  dateStr?: string;
  siteId: number;
  yandexDirect: null | boolean | string;
  googleAdWords: null | boolean | string;
  orders: Array<any>;
}
