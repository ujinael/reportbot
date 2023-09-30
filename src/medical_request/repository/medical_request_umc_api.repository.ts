import { AbstractRepository } from '@/core';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { UMCMedicalRequestDto } from '../dto';
import { MedicalRequest } from '../entities';
import { UMCMedicalRequestDtoToMedicalRequestMapper } from '../mappers/umc_medical_request_dto_to_medical_request.mapper';

export class MedicalRequestUmcApiRepository
  implements AbstractRepository<MedicalRequest>
{
  constructor(private httpService: HttpService) {}
  findAll(
    dateFrom: Date,
    dateTo: Date,
    employerId?: EntityID,
  ): Promise<MedicalRequest[]> {
    const startDate = dateFrom
      .toISOString()
      .replace(/\.(.*)/g, '')
      .trim();
    const endDate = dateTo
      .toISOString()
      .replace(/\.(.*)/g, '')
      .trim();
    const observ = this.httpService
      .get<UMCMedicalRequestDto[]>('/medical_requests/list', {
        params: {
          start_date: startDate,
          end_date: endDate,
          employer_id: employerId,
        },
      })
      .pipe(
        map((resp) =>
          resp.data.map((request) =>
            new UMCMedicalRequestDtoToMedicalRequestMapper(request).mapTo(),
          ),
        ),
      );

    return lastValueFrom(observ);
  }
  catch(error) {
    throw new HttpException(
      {
        reason: 'findByParams',
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errorText: (<Error>error).message,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
