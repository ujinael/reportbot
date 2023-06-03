import { OutputEmployerDto } from 'src/employer/dto/output-employer.dto';
import { MedicalRequest } from 'src/medical_request/entities/medical_request.entity';
import { NomenclatureItem } from 'src/nomenclature_item/entities/nomenclature_item.entity';

export const fromEmployersRequests = (employers: OutputEmployerDto[]) => {
  return employers
    .map((e) => {
      return `<b>${e.lastName} ${e.firstName.at(0)}${e.patronimyc.at(0)}🧑🏼‍⚕️</b>
${e.medicalRequests.map(fromRequest).join('\n')}`;
    })
    .join('\n\n');
};

export const fromRequest = (request: MedicalRequest) => {
  return `⏱${request.issueDate.toLocaleTimeString(undefined, {
    timeStyle: 'short',
  })}-${request.expirationDate.toLocaleTimeString(undefined, {
    timeStyle: 'short',
  })}: ${request.client.lastName} ${request.client.firstName.at(
    0,
  )}${request.client.patronimyc.at(0)}${fromNomenclature(
    request.nomenclature,
  )}${request.note ? '\n***' + request.note + '***' : ''}`;
};
export const fromNomenclature = (items: NomenclatureItem[]) => {
  return items.length
    ? `\n${items.map((item) => '<i>- ' + item.title + '</i>').join('\n')}`
    : '';
};
