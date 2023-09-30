import { AbstractMapper } from '@/core';
import { CallTouchRequestSession } from '@/calltouch/requests/entities/request_session.entity';
import { ICalltouchPhoneCallDto } from '../dto/calltouch-phonecall.dto';

export class ICallTouchPhoneCallDtoToCallTouchRequestSessionMapper
  implements AbstractMapper<CallTouchRequestSession>
{
  constructor(public dto: ICalltouchPhoneCallDto) {}
  mapTo() {
    const callTouchRequestSession = new CallTouchRequestSession();
    callTouchRequestSession.attribution = this.dto.attribution;
    callTouchRequestSession.attrs = this.dto.attrs;
    callTouchRequestSession.browser = this.dto.browser;
    callTouchRequestSession.city = this.dto.city;
    callTouchRequestSession.ctGlobalId = this.dto.ctGlobalId;
    callTouchRequestSession.ip = this.dto.ip;
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
