import { TgClientDto } from './tg_client.dto';
import { TgNomenclatureItem } from './tg_nomenclature_item.dto';
import { TgEmployerDto } from './tg_employee.dto';

export interface TgMedicalRequestDto {
  id: EntityID;
  issueDate: Date;
  expirationDate: Date;
  client: TgClientDto;
  employer: TgEmployerDto;
  nomenclatureItems: TgNomenclatureItem[];
  note?: string;
}
