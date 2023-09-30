import { AbstractMapper } from '@/core';
import { UMCEmployerDto } from '../dto';
import { Employer } from '../entities';

export class UMCEmployerDtoToEmployerMapper
  implements AbstractMapper<Employer>
{
  constructor(private dto: UMCEmployerDto) {}
  mapTo(): Employer {
    const employer = new Employer();
    employer.firstName = this.dto.first_name;
    employer.lastName = this.dto.last_name;
    employer.patronimyc = this.dto.patronimyc;
    return employer;
  }
}
