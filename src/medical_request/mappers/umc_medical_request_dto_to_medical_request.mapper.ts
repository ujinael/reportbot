import { UMCClientDtoToClientMapper } from '@/client/mappers/umc_client_dto_to_client.mapper';
import { AbstractMapper } from '@/core';
import { UMCEmployerDtoToEmployerMapper } from '@/employer/mappers';
import { UMCNomenclatureItemDtoToNomenclatureItemMapper } from '@/nomenclature_item/mappers/umc_nomenclature_Item_dto_to_nomencalture_item.mapper';
import { UMCMedicalRequestDto } from '../dto';
import { MedicalRequest } from '../entities';
import { dayjs } from '@/core';
export class UMCMedicalRequestDtoToMedicalRequestMapper
  implements AbstractMapper<MedicalRequest>
{
  constructor(private dto: UMCMedicalRequestDto) {}
  mapTo(): MedicalRequest {
    const medicalRequest = new MedicalRequest();
    medicalRequest.client = new UMCClientDtoToClientMapper(
      this.dto.client,
    ).mapTo();
    medicalRequest.employer = new UMCEmployerDtoToEmployerMapper(
      this.dto.employer,
    ).mapTo();
    medicalRequest.nomenclatureItems = this.dto.nomenclature.map((item) =>
      new UMCNomenclatureItemDtoToNomenclatureItemMapper(item).mapTo(),
    );
    medicalRequest.issueDate = dayjs(this.dto.issue_date).toDate();
    medicalRequest.expirationDate = dayjs(this.dto.expiration_date).toDate();
    medicalRequest.note = this.dto.note;
    return medicalRequest;
  }
}
