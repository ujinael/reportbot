import { AbstractMapper } from '@/core';
import { MedicalRequest } from '@/medical_request/entities';
import { TgMedicalRequestDto } from '../dto';

export class MedicalRequestsToTgMedicalRequests
  implements AbstractMapper<TgMedicalRequestDto[]>
{
  constructor(private dto: MedicalRequest[]) {}
  mapTo(): TgMedicalRequestDto[] {
    return this.dto;
  }
}
