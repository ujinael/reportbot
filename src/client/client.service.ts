import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Client } from './entities/client.entity';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class ClientService {
  constructor(private readonly httpService: HttpService) {}
  create(createClientDto: CreateClientDto) {
    return 'This action adds a new client';
  }

  findAll() {
    return `This action returns all client`;
  }
  async findOneByTitle(title: string) {
    try {
      const result = await lastValueFrom(
        this.httpService.get<Array<Record<string, any>>>('/clients/list', {
          params: {
            title: title.trim().toLowerCase(),
          },
        }),
      ).then((resp) => {
        return resp.data;
      });
      const pretender = result.pop();
      if (!pretender) throw Error('Client not found');
      return await plainToInstance(Client, pretender);
    } catch (error) {
      Logger.error(error.message, 'ClientService.findOneByTitle');

      throw new HttpException(
        {
          errorText: (<Error>error).message,
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
