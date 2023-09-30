import { TgEmployerDto } from './tg_employee.dto';
import { TgMedicalRequestDto } from './tg_medical_request.dto';

export type TgEmployerWithRequestsDto = TgEmployerDto & {
  medicalRequests: TgMedicalRequestDto[];
};
