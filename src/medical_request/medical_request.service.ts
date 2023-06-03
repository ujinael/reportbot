import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMedicalRequestDto } from './dto/create-medical_request.dto';
import { UpdateMedicalRequestDto } from './dto/update-medical_request.dto';
import { HttpService } from '@nestjs/axios';
import { RequestFilter } from './entities/filter_params.interface';
import { MedicalRequest } from './entities/medical_request.entity';
import { error } from 'console';
import { lastValueFrom, map } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { OutputEmployerDto } from 'src/employer/dto/output-employer.dto';

@Injectable()
export class MedicalRequestService {
  constructor(private readonly httpModule: HttpService) {}
  create(createMedicalRequestDto: CreateMedicalRequestDto) {
    return 'This action adds a new medicalRequest';
  }

  findAll() {
    return `This action returns all medicalRequest`;
  }
  async findByParams(filter: RequestFilter) {
    try {
      const startDate = filter.startDate
        .toISOString()
        .replace(/\.(.*)/g, '')
        .trim();
      const endDate = filter.endDate
        .toISOString()
        .replace(/\.(.*)/g, '')
        .trim();
      const observ = this.httpModule
        .get<MedicalRequest[]>('/medical_requests', {
          params: {
            start_date: startDate,
            end_date: endDate,
          },
        })
        .pipe(map((resp) => plainToInstance(MedicalRequest, resp.data)));

      return await lastValueFrom(observ);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errorText: (<Error>error).message,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
  groupByEmployer(requests: MedicalRequest[]) {
    return requests.reduce<OutputEmployerDto[]>((prev, current, array) => {
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
  findOne(id: number) {
    return `This action returns a #${id} medicalRequest`;
  }

  update(id: number, updateMedicalRequestDto: UpdateMedicalRequestDto) {
    return `This action updates a #${id} medicalRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicalRequest`;
  }
}
