import { Module } from '@nestjs/common';
import { MedicalRequestModule } from 'src/medical_request/medical_request.module';
import { UserModule } from 'src/user/user.module';
import { TGUploadPhotoScene } from './upload_photo.scene';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [MedicalRequestModule, UserModule,HttpModule.register({})],
  providers: [TGUploadPhotoScene],
  exports: [TGUploadPhotoScene],
})
export class TGUploadPhotoModule {}