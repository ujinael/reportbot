import { UMCClientDto } from '@/client/dto';
import { UMCEmployerDto } from '@/employer/dto';
import { UMCNomenclatureItemDto } from '@/nomenclature_item/dto';

export interface UMCMedicalRequestDto {
  id: EntityID;
  issue_date: string;
  expiration_date: string;
  client: UMCClientDto;
  employer: UMCEmployerDto;
  nomenclature: UMCNomenclatureItemDto[];
  note?: string;
}
