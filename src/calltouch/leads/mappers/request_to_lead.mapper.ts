import { CallTouchRequest } from '@/calltouch/requests/entities/request.entity';
import { AbstractMapper } from '@/core';
import { ILead, LeadType } from '../entities/lead.entity';

export class CallTouchRequestToLeadMap implements AbstractMapper<ILead> {
  constructor(private dto: CallTouchRequest) {}
  mapTo(): ILead {
    return {
      type: LeadType.REQUEST,
      clientEmail: '',
      clientPhoneNumber: this.dto.client.phones[0].phoneNumber,
      clientFio: '',
      date: this.dto.date,
    };
  }
}
