import { Injectable } from '@nestjs/common';
import { CreateCallDto } from './dto/create-call.dto';
import { UpdateCallDto } from './dto/update-call.dto';

import { CallTouchApiPhoneCallRepository } from './repository';
import { dayjs } from '@/core';
@Injectable()
export class CallsService {
  constructor(
    private callTouchApiPhoneCallRepository: CallTouchApiPhoneCallRepository,
  ) { }
  create(createCallDto: CreateCallDto) {
    return 'This action adds a new call';
  }

  async findAll(dateFrom = '15/09/2023', dateTo = '15/09/2023') {
    const $dateFrom = dayjs(dateFrom, 'DD/MM/YYYY');
    const $dateTo = dayjs(dateTo, 'DD/MM/YYYY');
    const responseData = await this.callTouchApiPhoneCallRepository.findAll(
      $dateFrom.toDate(),
      $dateTo.toDate(),
    );
    return responseData;
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
