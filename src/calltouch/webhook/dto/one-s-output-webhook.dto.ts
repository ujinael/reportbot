import { IncommingCalltouchWebhookDto } from './incomming-webhook.dto';

export type OutputOneSWebhookDto = Pick<
  IncommingCalltouchWebhookDto,
  | 'callerphone'
  | 'utm_campaign'
  | 'utm_source'
  | 'utm_medium'
  | 'utm_term'
  | 'utm_content'
  | 'requestDate'
> & {
  leadDate: string;
};
