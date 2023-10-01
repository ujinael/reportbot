import { GoogleAdWords, ICallTouchLead, YandexDirect } from '@/calltouch/leads';
import { ICallTouchClientDto, ICallTouchSessionDto } from './index';
export type CallTouchRequestComment = {
  commentId: number;
  requestId: number;
  comment: string;
  partyId: number;
  pertyName: string;
};
export class ICallTouchRequestDto implements ICallTouchLead {
  /**
   * Дата и время создания заявки в формате Unix Timestamp в миллисекундах.
   */
  date: number;
  comments: Array<CallTouchRequestComment>;
  requestType: null | string;
  /**
   * Дата и время создания заявки в формате dd/mm/yyyy hh:mm:ss.
   */
  dateStr: string;
  manager: string;
  session: ICallTouchSessionDto | null;
  /**
   * Название формы на Вашем сайте, которое Вы отправили в запросе.
   */
  subject: string;
  uniqTargetRequest: boolean;
  uniqueRequest: boolean;
  yandexDirect: null | YandexDirect;
  googleAdWords: null | GoogleAdWords;
  /**
   * Уникальный идентификатор заявки на Вашем сайте, который Вы отправили в запросе.
   *  Если Вы не отправляли данный параметр, в ответе будет содержаться уникальный
   * идентификатор заявки в Calltouch (он же будет и в объекте Дата и время создания
   * заявки в формате dd/mm/yyyy hh:mm:ss. далее).
   */
  requestNumber: string;
  /**
   *Уникальный идентификатор заявки в Calltouch.
   */
  requestId: number;
  client: ICallTouchClientDto;
  siteId: number;
  orders: Array<any>;
  targetRequest: boolean;
  status: string;
  order: null | any;
  mapVisits: Array<any>;
  /**
   * URL страницы, с которой была отправлена заявка
   */
  requestUrl: string;
  /**
   * Идентификатор посетителя Calltouch. Он представляет из себя значение нашей куки _ct.
   * Если в звонке значение отсутствует (у лида нет сессии, например, звонок на статический номер),
   *  то в значении будет null
   */
  ctClientId: number;
  dcm: string | null;
  ctGlobalId: string | null;
  widgetInfo: string | null;
  RequestTags: Array<string> | null;
  /**
   * Сторонние параметры, переданные заранее в статистику Calltouch.
   * Выгружаются, если во входных параметрах был передан флаг withAttrs=true.
   */
}
