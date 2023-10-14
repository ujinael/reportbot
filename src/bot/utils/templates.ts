import { TgEmployerWithRequestsDto } from '@/bot/dto';
import { NomenclatureItem } from '@/nomenclature_item/entities/nomenclature_item.entity';
import { TgMedicalRequestDto } from '../dto';

export const fromEmployersRequests = (
  employers: TgEmployerWithRequestsDto[],
) => {
  return employers
    .map((e) => {
      return `<b>${e.lastName} ${e.firstName.at(0)}${e.patronimyc.at(0)}🧑🏼‍⚕️</b>
${e.medicalRequests.map(fromRequest).join('\n')}`;
    })
    .join('\n\n');
};

export const fromRequest = (request: TgMedicalRequestDto) => {
  return `⏱${request.issueDate.toLocaleTimeString(undefined, {
    timeStyle: 'short',
  })}-${request.expirationDate.toLocaleTimeString(undefined, {
    timeStyle: 'short',
  })}: ${request.client.surname} ${request.client.name.at(
    0,
  )}${request.client.patronimyc.at(0)}${fromNomenclature(
    request.nomenclatureItems,
  )}${request.note ? '\n***' + request.note + '***' : ''}`;
};
export const fromNomenclature = (items: NomenclatureItem[]) => {
  return items.length
    ? `\n${items.map((item) => '<i>- ' + item.title + '</i>').join('\n')}`
    : '';
};
