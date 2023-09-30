import { CallTouchPhoneCall } from '@/calltouch/calls/entities/phonecall.entity';
import { AbstractMapper } from '@/core';
import { ILead, LeadType } from '../entities/lead.entity';

export class CallTouchPhoneCallToLeadMap implements AbstractMapper<ILead> {
  constructor(private dto: CallTouchPhoneCall) {}
  mapTo(): ILead {
    return {
      type: LeadType.CALL,
      clientEmail: '',
      clientPhoneNumber: this.dto.callerNumber,
      clientFio: '',
      date: this.dto.date,
    };
  }
}
