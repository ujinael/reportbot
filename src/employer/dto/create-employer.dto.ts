import { PickType } from '@nestjs/mapped-types';
import { Employer } from '../entities/employer.entity';

export class CreateEmployerDto extends PickType(Employer, [
  'firstName',
  'id',
  'lastName',
  'patronimyc',
]) {}
