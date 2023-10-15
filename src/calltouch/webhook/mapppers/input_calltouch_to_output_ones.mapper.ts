import { AbstractMapper } from '@/core';
import { IncommingCalltouchWebhookDto, OutputOneSWebhookDto } from '../dto';
import { dayjs } from '@/core';
export class InputCallTouchDtoToOutputOneSDtoMapper
  implements AbstractMapper<OutputOneSWebhookDto>
{
  constructor(private dto: IncommingCalltouchWebhookDto) {}
  mapTo(): OutputOneSWebhookDto {
    const leadDateStr = this.dto.requestDate ?? this.dto.calltime;
    const dayJsLeadDate = leadDateStr
      ? dayjs(leadDateStr, 'YYYY-MM-DD hh:mm:ss')
      : dayjs();
    console.log(dayJsLeadDate.format('YYYYMMDDhhmmss'));

    return {
      leadType: this.dto.leadtype,
      callerphone: this.dto.callerphone,
      utm_source: this.dto.utm_source,
      utm_campaign: this.dto.utm_campaign,
      utm_medium: this.dto.utm_medium,
      utm_term: this.dto.utm_term,
      utm_content: this.dto.utm_content,
      leadDate: dayJsLeadDate.format('YYYYMMDDhhmmss'),
    };
  }
}
