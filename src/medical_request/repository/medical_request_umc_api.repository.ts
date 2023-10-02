import { AbstractFindAllRepository } from '@/core';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { lastValueFrom, map, catchError } from 'rxjs';
import { UMCMedicalRequestDto } from '../dto';
import { MedicalRequest } from '../entities';
import { UMCMedicalRequestDtoToMedicalRequestMapper } from '../mappers/umc_medical_request_dto_to_medical_request.mapper';
@Injectable()
export class MedicalRequestUmcApiRepository
  implements AbstractFindAllRepository<MedicalRequest>
{
  constructor(private httpModule: HttpService) {}
  findAll(
    dateFrom: Date,
    dateTo: Date,
    employerId?: EntityID,
  ): Promise<MedicalRequest[]> {
    try {
      const startDate = dateFrom
        .toISOString()
        .replace(/\.(.*)/g, '')
        .trim();
      const endDate = dateTo
        .toISOString()
        .replace(/\.(.*)/g, '')
        .trim();
      const observ = this.httpModule
        .get<UMCMedicalRequestDto[]>('/medical_requests/list', {
          params: {
            start_date: startDate,
            end_date: endDate,
            employer_id: employerId,
          },
        })
        .pipe(
          catchError((error, resp) => {
            Logger.error(
              error.message,
              'MedicalRequestUmcApiRepository.findAll',
            );
            return resp;
          }),
        )
        .pipe(
          map((resp) =>
            resp.data.map((request) =>
              new UMCMedicalRequestDtoToMedicalRequestMapper(request).mapTo(),
            ),
          ),
        );

      return lastValueFrom(observ);
    } catch (error) {
      Logger.error(error.message, 'MedicalRequestUmcApiRepository.findAll');
      throw new HttpException(
        {
          reason: 'MedicalRequestUmcApiRepository.findAll',
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errorText: (<Error>error).message,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
