import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMedicalRequestDto } from './dto/create-medical_request.dto';
import { UpdateMedicalRequestDto } from './dto/update-medical_request.dto';
import { RequestFilter } from './entities/filter_params.interface';
import { MedicalRequest } from './entities/medical_request.entity';
import { MedicalRequestUmcApiRepository } from './repository/medical_request_umc_api.repository';

@Injectable()
export class MedicalRequestService {
  constructor(
    private readonly medicalRequestUmcApiRepository: MedicalRequestUmcApiRepository,
  ) {}
  create(createMedicalRequestDto: CreateMedicalRequestDto) {
    return 'This action adds a new medicalRequest';
  }

  findAll() {
    return `This action returns all medicalRequest`;
  }
  async findByParams(filter: RequestFilter): Promise<MedicalRequest[]> {
    try {
      const { employer_id, startDate, endDate } = filter;
      return this.medicalRequestUmcApiRepository.findAll(
        startDate,
        endDate,
        employer_id,
      );
    } catch (error) {
      throw new HttpException(
        {
          reason: error.reason ?? 'findByParams',
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errorText: (<Error>error).message,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
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
