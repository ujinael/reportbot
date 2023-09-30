import { AbstractMapper } from '@/core';
import { TgEmployerWithRequestsDto, TgMedicalRequestDto } from '../dto';

export class TgMedicalRequestsToEmployersWithRequestsMapper
  implements AbstractMapper<TgEmployerWithRequestsDto[]>
{
  constructor(private dto: TgMedicalRequestDto[]) {}

  mapTo(): TgEmployerWithRequestsDto[] {
    return this.dto.reduce<TgEmployerWithRequestsDto[]>((prev, current) => {
      const pretender = prev.find((emp) => emp.id === current.employer.id);
      if (pretender) {
        pretender.medicalRequests.push(current);
        return prev;
      } else {
        prev.push({ ...current.employer, medicalRequests: [current] });
        return prev;
      }
    }, []);
  }
}
