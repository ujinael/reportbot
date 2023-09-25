import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpOneSConfigService } from 'src/http';

@Module({
  imports: [HttpModule.registerAsync({
    useClass: HttpOneSConfigService
  })],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService]

})
export class ClientModule { }
