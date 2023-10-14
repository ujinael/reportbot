import { Module } from '@nestjs/common';
import { MedicalRequestModule } from '@/medical_request/medical_request.module';
import { UserModule } from '@/user/user.module';
import { TGUploadPhotoScene } from './upload_photo.scene';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [MedicalRequestModule, UserModule, HttpModule.register({})],
  providers: [TGUploadPhotoScene],
  exports: [TGUploadPhotoScene],
})
export class TGUploadPhotoModule {}
