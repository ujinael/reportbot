import { PropsType } from '@/core';
import {
  ICallTouchLead,
  YandexDirect,
  GoogleAdWords,
} from '@/calltouch/leads/entities';
export const CallPhase = {
  CALL_CONNECTED: 'callconnected',
  CALL_DISCONNECTED: 'calldisconnected',
} as const;

export type CallPhase = PropsType<typeof CallPhase>;

export class ICalltouchPhoneCallDto implements ICallTouchLead {
  callId: string;
  callphase: CallPhase = 'callconnected';
  /**
   * Модель атрибуции принимает значение 0(последнее взаимодействие) или 1(последний непрямой)
   * В звисимости от выбранного значения будет меняться источник звонка. При выбранном значении 1
   * будут игнорироваться источники прямого перехода
   */
  attribution: number;
  callTags: Array<any>;
  date: string;
  duration: number;
  callerNumber: string;
  redirectNumber: string;
  phoneNumber: string;
  manager: string;
  /**
   * Успешный или нет
   */
  successful: boolean;
  /**
   * Уникальный или нет
   */
  uniqueCall: boolean;
  /**
   * Целевой или нет
   */
  targetCall: boolean;
  /**
   * Уникально-целевой или нет
   */
  uniqTargetCall: boolean;
  callbackCall: boolean;
  /**
   * Город в котором совершается звонок, вычисляется по айпи
   */
  city: string;
  /**
   * Источник трафика по которому был совершен звонок
   */
  source: string;
  /**
   * Тип трафика по которому был совершен звонок
   */
  medium: string;
  keyword: string;
  /**
   * Адрес, по которому был совершен переход на сайт
   */
  url: string;
  /**
   * Адрес страницы, находясь на которой, посетитель совершил звонок.
   */
  callUrl: string;
  /**
   * Адрес, с которого перешли на сайт.
   */
  ref: string;
  /**
   * Отслеживаемый домен или поддомен ресурса, на который был осуществлен переход (например: yoursite.ru).
   */
  hostname: string;
  /**
   * Значение utm-метки utm_source
   */
  utmSource: string;
  /**
   * Значение utm-метки utm_medium.
   */
  utmMedium: string;
  /**
   * Значение utm-метки utm_campaign.
   */
  utmCampaign: string;
  /**
   * Значение utm-метки utm_content.
   */
  utmContent: string;
  /**
   * Значение utm-метки utm_term.
   */
  utmTerm: string;
  /**
   * Уникальный идентификатор сессии Calltouch.
   */
  sessionId: number | null;
  /**
   * Уникальный идентификатор клиента в Calltouch.
   * Определяется по номеру телефона клиента. Его удобно использовать,
   * когда нужно идентифицировать клиента без использования
   * его персональных данных (номер телефона).
   */
  ctCallerId: string;
  /**
   * Уникальный идентификатор Universal Analytics. Параметр присутствует
   * в случае, если настроена интеграция Calltouch с Universal Analytics.
   */
  clientId: number | null;
  /**
   * Уникальный идентификатор Яндекс.Метрика. Значение параметра не равно null,
   *  если настроена выгрузка звонков в Яндекс.Метрика.
   */

  yaClientId: string;
  sipCallId: string;
  /**
   * Информация об устройстве, с которого зашли на сайт.
   */
  userAgent: string;
  /**
   * IP-адрес посетителя.
   */
  ip: string;
  /**
   * Время соединения
   */
  waitingConnect: number;
  /**
   * Уникальный ID звонка с Вашей АТС, переданный в параметре callid API-запроса на импорт звонков.
   */
  callReferenceId: string;
  /** Карта посещений сайта */
  mapVisits: Array<any> | null;
  attrs: Array<any> | null;
  comments: Array<any> | null;
  /**
   * Фразы распознанные из звонка
   */
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
  yandexDirect: YandexDirect | null;
  googleAdWords: GoogleAdWords | null;
  siteId: number;
  siteName: string;
  callbackInfo: string;
  /**
   * Идентификатор посетителя Calltouch. Он представляет из себя значение куки колтач _ct.
   *  Если в звонке значение отсутствует (у лида нет сессии, например, звонок на статический номер),
   *  то в значении будет null.
   */
  ctClientId: number;
  dcm: string;
  /**
   * Массив номеров телефонов, полученных из текста разговора (номера были произнесены в ходе разговора).
   * Значение параметра в ответе формируется только при включении соответствующего сеттинга
   * (требуется обратиться к вашему менеджеру). Если сеттинг не включен, или в звонке значение отсутствует
   * (Сервис Calltouch Predict выключен или не успел обработать запись, или номеров в разговоре произнесено не было),
   * то в значении будет null.
   */
  phonesInText: string;
  /**
   *лобальный идентификатор посетителя Calltouch, общий для сайтов, на которых установлен скрипт
    Calltouch. Он представляет из себя значение сквозной куки _ct_client_global_id. 
    Значение параметра в ответе формируется только при включении соответствующего сеттинга 
    (требуется обратиться к вашему менеджеру). Если сеттинг не включен, или в звонке значение отсутствует 
    (у лида нет сессии, например, звонок на статический номер), то в значении будет null.
   */
  ctGlobalId: string | null;
  subPoolName: string | null;
  statusDetails: string;
}
