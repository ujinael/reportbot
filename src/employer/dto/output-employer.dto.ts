import { PickType } from '@nestjs/mapped-types';
import { Employer } from '../entities/employer.entity';
import { MedicalRequest } from 'src/medical_request/entities/medical_request.entity';

export class OutputEmployerDto extends PickType(Employer, [
  'firstName',
  'id',
  'lastName',
  'patronimyc',
]) {
  medicalRequests: MedicalRequest[];
}
