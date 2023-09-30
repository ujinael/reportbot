import { ICallTouchLead } from 'src/calltouch/leads/entities/lead.entity';
import { ICallTouchClientDto, ICallTouchSessionDto } from './index';

export class ICallTouchRequestDto implements ICallTouchLead {
  date: number;
  comments: Array<any>;
  requestType: null | string;
  dateStr: string;
  manager: string;
  session: ICallTouchSessionDto;
  subject: string;
  uniqTargetRequest: boolean;
  uniqueRequest: boolean;
  yandexDirect: null | boolean | string;
  googleAdWords: null | boolean | string;
  requestNumber: string;
  requestId: number;
  client: ICallTouchClientDto;
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
