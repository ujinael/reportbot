import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpOneSConfigService } from '@/http';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpOneSConfigService,
    }),
    TypeOrmModule.forFeature([Client]),
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
