import { ICallTouchLead, ILead } from '../entities/lead.entity';

export type LeadMapper = (
  callTouchEvent: ICallTouchLead,
  ...args: any[]
) => ILead;
