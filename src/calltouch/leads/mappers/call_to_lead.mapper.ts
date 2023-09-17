import { ICalltouchPhoneCallDto } from 'src/calltouch/calls/dto/calltouch-phonecall.dto';
import { ILead, LeadType } from '../entities/lead.entity';

export const callToLeadMapper = (
  callTouchEvent: ICalltouchPhoneCallDto,
  params?: Record<string, unknown>,
): ILead => {
  return {
    type: LeadType.CALL,
    clientEmail: '',
    clientPhoneNumber: callTouchEvent.callerNumber,
    clientFio: '',
    date: new Date(callTouchEvent.date),
  };
};
