import { Module } from '@nestjs/common';
import { MedicalRequestModule } from '@/medical_request/medical_request.module';
import { UserModule } from '@/user/user.module';
import { HttpModule } from '@nestjs/axios';
import { TGClientCardScene } from './client_card.scene';
import { ClientModule } from '@/client/client.module';

@Module({
  imports: [
    MedicalRequestModule,
    UserModule,
    ClientModule,
    HttpModule.register({}),
  ],
  providers: [TGClientCardScene],
  exports: [TGClientCardScene],
})
export class TGClientCardModule {}
