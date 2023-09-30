import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalRequestDto } from './create-medical_request.dto';

export class UpdateMedicalRequestDto extends PartialType(
  CreateMedicalRequestDto,
) {}
