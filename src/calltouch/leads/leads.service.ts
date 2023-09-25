import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CallsService } from '../calls/calls.service';
import { RequestsService } from '../requests/requests.service';
import { callToLeadMapper } from './mappers/call_to_lead.mapper';
import { requestToLeadMapper } from './mappers/request_to_lead.mapper';
import { CallTouchLeadDto } from './dto/calltouch-lead.dto';

@Injectable()
export class LeadsService {
  constructor(
    private readonly httpModule: HttpService,
    private readonly configService: ConfigService,
    private readonly callsService: CallsService,
    private readonly requestsService: RequestsService,
  ) { }
  create(createLeadDto: CallTouchLeadDto) {
    Logger.log(createLeadDto)
    return HttpStatus.OK;
  }

  async findAll(dateFrom: string, dateTo: string) {
    const calls = await this.callsService.findAll(dateFrom, dateTo);
    const requests = await this.requestsService.findAll(dateFrom, dateTo);
    return [
      ...calls.map((call) => callToLeadMapper(call)),
      ...requests.map((request) => requestToLeadMapper(request)),
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
