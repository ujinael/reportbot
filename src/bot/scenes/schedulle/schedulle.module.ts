import { Module } from '@nestjs/common';
import { TGSchedulleScene } from './schedulle.scene';
import { MedicalRequestModule } from 'src/medical_request/medical_request.module';

@Module({
  imports: [MedicalRequestModule],
  providers: [TGSchedulleScene],
  exports: [TGSchedulleScene],
})
export class TGSchedulleModule {}
