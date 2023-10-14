import { Expose, Type } from 'class-transformer';
import { Client } from '@/client/entities/client.entity';
import { Employer } from '@/employer/entities/employer.entity';
import { NomenclatureItem } from '@/nomenclature_item/entities/nomenclature_item.entity';

export class MedicalRequest {
  id: string;
  @Expose({ name: 'issue_date' })
  @Type(() => Date)
  issueDate: Date;
  @Expose({ name: 'expiration_date' })
  @Type(() => Date)
  expirationDate: Date;
  @Type(() => Client)
  client: Client;
  @Type(() => Employer)
  employer: Employer;
  @Type(() => NomenclatureItem)
  nomenclatureItems: NomenclatureItem[];
  note?: string;
}
