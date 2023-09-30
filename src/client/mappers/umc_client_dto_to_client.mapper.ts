import { AbstractMapper } from '@/core';
import { UMCClientDto } from '../dto';
import { Client } from '../entities';

export class UMCClientDtoToClientMapper implements AbstractMapper<Client> {
  constructor(private dto: UMCClientDto) {}
  mapTo(): Client {
    const client = new Client();
    client.name = this.dto.first_name;
    client.surname = this.dto.last_name;
    client.patronimyc = this.dto.patronimyc;
    return client;
  }
}
