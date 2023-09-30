import { AbstractMapper } from '@/core';
import { CallTouchRequestSession } from '../entities/request_session.entity';
import { ICallTouchSessionDto } from '../dto';

export class ICallTouchSessionDtoToCallTouchRequestSessionMapper
  implements AbstractMapper<CallTouchRequestSession>
{
  constructor(public dto: ICallTouchSessionDto) {}
  mapTo() {
    const callTouchRequestSession = new CallTouchRequestSession();
    callTouchRequestSession.attribution = this.dto.attribution;
    callTouchRequestSession.attrs = this.dto.attrs;
    callTouchRequestSession.browser = this.dto.browser;
    callTouchRequestSession.city = this.dto.city;
    callTouchRequestSession.ctGlobalId = this.dto.ctGlobalId;
    callTouchRequestSession.guaClientId = this.dto.guaClientId;
    callTouchRequestSession.ip = this.dto.ip;
    callTouchRequestSession.keywords = this.dto.keywords;
    callTouchRequestSession.medium = this.dto.medium;
    callTouchRequestSession.ref = this.dto.ref;
    callTouchRequestSession.sessionDate = this.dto.sessionDate;
    callTouchRequestSession.sessionId = this.dto.sessionId;
    callTouchRequestSession.source = this.dto.source;
    callTouchRequestSession.url = this.dto.url;
    callTouchRequestSession.utmCampaign = this.dto.utmCampaign;
    callTouchRequestSession.utmContent = this.dto.utmContent;
    callTouchRequestSession.utmSource = this.dto.utmSource;
    callTouchRequestSession.utmTerm;
    callTouchRequestSession.yaClientId;
    return callTouchRequestSession;
  }
}
