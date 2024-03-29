import { Injectable } from '@nestjs/common';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CallsService } from '../calls/calls.service';
import { RequestsService } from '../requests/requests.service';
import {
  CallTouchPhoneCallToLeadMap,
  CallTouchRequestToLeadMap,
} from './mappers';

@Injectable()
export class LeadsService {
  constructor(
    private readonly httpModule: HttpService,
    private readonly configService: ConfigService,
    private readonly callsService: CallsService,
    private readonly requestsService: RequestsService,
  ) {}
  async findAll(dateFrom: string, dateTo: string) {
    const calls = await this.callsService.findAll(dateFrom, dateTo);
    const requests = await this.requestsService.findAll(dateFrom, dateTo);
    return [
      ...calls.map((call) => new CallTouchPhoneCallToLeadMap(call).mapTo()),
      ...requests.map((request) =>
        new CallTouchRequestToLeadMap(request).mapTo(),
      ),
    ];
  }

  findOne(id: number) {
    return `This action returns a #${id} lead`;
  }

  update(id: number, updateLeadDto: UpdateLeadDto) {
    return `This action updates a #${id} lead`;
  }

  remove(id: number) {
    return `This action removes a #${id} lead`;
  }
}
