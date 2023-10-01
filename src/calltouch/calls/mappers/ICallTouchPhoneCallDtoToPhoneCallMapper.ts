import { AbstractMapper, dayjs } from '@/core';
import { ICalltouchPhoneCallDto } from '../dto/calltouch-phonecall.dto';
import { CallTouchPhoneCall } from '../entities/phonecall.entity';
import { ICallTouchPhoneCallDtoToCallTouchRequestSessionMapper } from './ICallTouchPhoneCallDtoToCallTouchSessionMapper';

export class ICallTouchPhoneCallDtoToCallTouchPhoneCallMapper
  implements AbstractMapper<CallTouchPhoneCall>
{
  constructor(private dto: ICalltouchPhoneCallDto) {}
  mapTo(): CallTouchPhoneCall {
    const phoneCall = new CallTouchPhoneCall();
    phoneCall.callClientUniqueId = this.dto.callClientUniqueId;
    phoneCall.callId = this.dto.callId;
    phoneCall.callReferenceId = this.dto.callReferenceId;
    phoneCall.callUrl = this.dto.callUrl;
    phoneCall.callbackCall = this.dto.callbackCall;
    phoneCall.callbackInfo = this.dto.callbackInfo;
    phoneCall.callerNumber = this.dto.callerNumber;
    phoneCall.callphase = this.dto.callphase;
    phoneCall.clientId = this.dto.clientId;
    phoneCall.ctCallerId = this.dto.ctCallerId;
    phoneCall.ctClientId = this.dto.ctClientId;
    phoneCall.ctGlobalId = this.dto.ctGlobalId;
    phoneCall.date = dayjs(this.dto.date, 'DD/MM/YYYY hh:mm:ss').toDate();
    phoneCall.dcm = this.dto.dcm;
    phoneCall.device = this.dto.device;
    phoneCall.duration = this.dto.duration;
    phoneCall.hostname = this.dto.hostname;
    phoneCall.manager = this.dto.manager;
    phoneCall.os = this.dto.os;
    phoneCall.phoneNumber = this.dto.phoneNumber;
    phoneCall.phonesInText = this.dto.phonesInText;
    phoneCall.redirectNumber = this.dto.redirectNumber;
    phoneCall.session =
      new ICallTouchPhoneCallDtoToCallTouchRequestSessionMapper(
        this.dto,
      ).mapTo();
    phoneCall.sessionDate = this.dto.sessionDate;
    phoneCall.sipCallId = this.dto.sipCallId;
    phoneCall.siteId = this.dto.siteId;
    phoneCall.siteName = this.dto.siteName;
    phoneCall.statusDetails = this.dto.statusDetails;
    phoneCall.subPoolName = this.dto.subPoolName;
    phoneCall.successful = this.dto.successful;
    phoneCall.targetCall = this.dto.targetCall;
    phoneCall.timestamp = this.dto.timestamp;
    phoneCall.uniqTargetCall = this.dto.uniqTargetCall;
    phoneCall.uniqueCall = this.dto.uniqueCall;
    phoneCall.userAgent = this.dto.userAgent;
    phoneCall.waitingConnect = this.dto.waitingConnect;
    return phoneCall;
  }
}
