import { ICallTouchRequestDto } from 'src/calltouch/requests/dto/calltouch-request.dto';
import { ILead, LeadType } from '../entities/lead.entity';

export const requestToLeadMapper = (
  callTouchEvent: ICallTouchRequestDto,
  params?: Record<string, unknown>,
): ILead => {
  return {
    type: LeadType.REQUEST,
    clientEmail: '',
    clientPhoneNumber: callTouchEvent.client.phones[0].phoneNumber,
    clientFio: '',
    date: new Date(callTouchEvent.date),
  };
};
