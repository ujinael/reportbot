import { CallTouchRequestClient } from '../entities/request_client.entity';
import { ICallTouchClientDto } from '../dto';
import { IRequestClientPhoneDtoToRequestClientPhoneMapper } from './IRequestClientPhoneDtoToRequestClientPhoneMapper';
import { AbstractMapper } from '@/core';

export class ICallTouchClientDtoToCallTouchRequestClientMapper
  implements AbstractMapper<CallTouchRequestClient>
{
  constructor(public dto: ICallTouchClientDto) {}
  mapTo() {
    const callTouchRequestClient = new CallTouchRequestClient();
    callTouchRequestClient.clientId = this.dto.clientId;
    callTouchRequestClient.fio = this.dto.fio;
    callTouchRequestClient.phones =
      new IRequestClientPhoneDtoToRequestClientPhoneMapper(
        this.dto.phones,
      ).mapTo();
    return callTouchRequestClient;
  }
}
