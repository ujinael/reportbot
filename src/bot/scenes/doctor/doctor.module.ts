import { Module } from '@nestjs/common';
import { MedicalRequestModule } from 'src/medical_request/medical_request.module';
import { UserModule } from 'src/user/user.module';
import { TGDoctorScene } from './doctor.scene';

@Module({
  imports: [MedicalRequestModule, UserModule],
  providers: [TGDoctorScene],
  exports: [TGDoctorScene],
})
export class TGDoctorModule {}
