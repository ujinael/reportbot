import { Expose, Type } from 'class-transformer';
import { Client } from 'src/client/entities/client.entity';
import { Employer } from 'src/employer/entities/employer.entity';
import { NomenclatureItem } from 'src/nomenclature_item/entities/nomenclature_item.entity';

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
  nomenclature: NomenclatureItem[];
  note?: string;
}
