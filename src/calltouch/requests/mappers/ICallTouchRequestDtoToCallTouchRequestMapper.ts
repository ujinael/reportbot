import { AbstractMapper } from '@/core';
import { ICallTouchRequestDto } from '../dto/calltouch-request.dto';
import { CallTouchRequest } from '../entities/request.entity';
import { ICallTouchClientDtoToCallTouchRequestClientMapper } from './ICallTouchClientDtoToCallTouchRequestClientMapper';
import { ICallTouchSessionDtoToCallTouchRequestSessionMapper } from './ICallTouchSessionDtoToCallTouchRequestSessionMapper';

export class ICallTouchRequestDtoToCallTouchRequestMapper
  implements AbstractMapper<CallTouchRequest>
{
  constructor(public dto: ICallTouchRequestDto) {}
  mapTo() {
    const callTouchRequest = new CallTouchRequest();
    callTouchRequest.ctClientId = this.dto.ctClientId;
    callTouchRequest.date = new Date(this.dto.date);
    callTouchRequest.ctGlobalId = this.dto.ctGlobalId;
    callTouchRequest.dateStr = this.dto.dateStr;
    callTouchRequest.dcm = this.dto.dcm;
    callTouchRequest.googleAdWords = String(this.dto.googleAdWords);
    callTouchRequest.manager = this.dto.manager;
    callTouchRequest.requestId = this.dto.requestId;
    callTouchRequest.requestNumber = this.dto.requestNumber;
    callTouchRequest.requestType = this.dto.requestType;
    callTouchRequest.requestUrl = this.dto.requestUrl;
    callTouchRequest.client =
      new ICallTouchClientDtoToCallTouchRequestClientMapper(
        this.dto.client,
      ).mapTo();
    callTouchRequest.session =
      new ICallTouchSessionDtoToCallTouchRequestSessionMapper(
        this.dto.session,
      ).mapTo();
    callTouchRequest.siteId = this.dto.siteId;
    callTouchRequest.status = this.dto.status;
    callTouchRequest.subject = this.dto.subject;
    callTouchRequest.targetRequest = this.dto.targetRequest;
    callTouchRequest.uniqTargetRequest = this.dto.uniqTargetRequest;
    callTouchRequest.uniqueRequest = callTouchRequest.uniqueRequest;
    callTouchRequest.yandexDirect = callTouchRequest.yandexDirect;
    return callTouchRequest;
  }
}
