import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateCallDto } from './dto/create-call.dto';
import { UpdateCallDto } from './dto/update-call.dto';

import { CallTouchApiPhoneCallRepository } from './repository';
import { dayjs } from '@/core';
import { InjectRepository } from '@nestjs/typeorm';
import { CallTouchPhoneCall } from './entities';
import { Between, Repository } from 'typeorm';
@Injectable()
export class CallsService {
  constructor(
    private callTouchApiPhoneCallRepository: CallTouchApiPhoneCallRepository,
    @InjectRepository(CallTouchPhoneCall)
    private readonly callTouchTypeormRepository: Repository<CallTouchPhoneCall>,
  ) {}
  create(createCallDto: CreateCallDto) {
    return 'This action adds a new call';
  }

  async findAll(dateFrom = '15/09/2023', dateTo = '15/09/2023') {
    try {
      const $dateFrom = dayjs(dateFrom, 'DD/MM/YYYY');
      const $dateTo = dayjs(dateTo, 'DD/MM/YYYY');

      const isDateQueryBeforeCurrentDate = dayjs()
        .startOf('d')
        .isAfter($dateTo);
      if (isDateQueryBeforeCurrentDate) {
        const phoneCalls = await this.callTouchTypeormRepository.find({
          relations: {
            session: true,
          },
          where: {
            date: Between(
              $dateFrom.startOf('d').toDate(),
              $dateTo.endOf('d').toDate(),
            ),
          },
        });
        Logger.log('FROM_CASH', 'CallsService');
        if (phoneCalls.length) return phoneCalls;
        else {
          const responseData =
            await this.callTouchApiPhoneCallRepository.findAll(
              $dateFrom.toDate(),
              $dateTo.toDate(),
            );
          Logger.log('NOT_CASHED', 'CallsService');
          await this.callTouchTypeormRepository.save(responseData);
          Logger.log('SAVED_TO_CASH', 'CallsService');
          return responseData;
        }
      } else {
        Logger.log('NOT_CASHED', 'CallsService');
        const responseData = await this.callTouchApiPhoneCallRepository.findAll(
          $dateFrom.toDate(),
          $dateTo.toDate(),
        );
        return responseData;
      }
    } catch (error) {
      Logger.error((<Error>error).message, 'CallsService.findAll');
      throw new HttpException(
        {
          reason: 'CallsService.findAll',
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errorText: (<Error>error).message,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
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
