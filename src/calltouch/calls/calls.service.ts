import { Injectable } from '@nestjs/common';
import { CreateCallDto } from './dto/create-call.dto';
import { UpdateCallDto } from './dto/update-call.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';
import { Call } from './entities/call.entity';
import { ICalltouchPhoneCallDto } from './dto/calltouch-phonecall.dto';

@Injectable()
export class CallsService {
  constructor(
    private readonly httpModule: HttpService,
    private readonly configService: ConfigService,
  ) {}
  create(createCallDto: CreateCallDto) {
    return 'This action adds a new call';
  }

  async findAll(dateFrom = '15/09/2023', dateTo = '15/09/2023') {
    const clientId = this.configService.get('calltouch.clientId');
    const token = this.configService.get('calltouch.token');
    const $responseData = this.httpModule
      .get<ICalltouchPhoneCallDto[]>(
        `calls-service/RestAPI/${clientId}/calls-diary/calls`,
        {
          params: {
            dateFrom,
            dateTo,
            clientApiId: token,
          },
        },
      )
      .pipe(map((resp) => resp.data));
    return await lastValueFrom($responseData);
  }

  findOne(id: number) {
    return `This action returns a #${id} call`;
  }

  update(id: number, updateCallDto: UpdateCallDto) {
    return `This action updates a #${id} call`;
  }

  remove(id: number) {
    return `This action removes a #${id} call`;
  }
}
