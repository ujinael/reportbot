import { AbstractMapper } from '@/core';
import { RequestClientPhone } from '../entities/request_client_phone.entity';

export class IRequestClientPhoneDtoToRequestClientPhoneMapper
  implements AbstractMapper<RequestClientPhone[]>
{
  constructor(
    public dto: Record<
      keyof Omit<RequestClientPhone, 'id' | 'client'>,
      string
    >[],
  ) {}
  mapTo() {
    return this.dto.map((phoneDto) => {
      const phone = new RequestClientPhone();
      phone.phoneNumber = phoneDto.phoneNumber;
      phone.phoneType = phoneDto.phoneType;
      return phone;
    });
  }
}
