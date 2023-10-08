import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateCallTouchRequestDto } from './dto/create-request.dto';
import { UpdateCallTouchRequestDto } from './dto/update-request.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CallTouchApiRequestRepository } from './repository';
import { dayjs } from '@/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Equal, Repository } from 'typeorm';
import { CallTouchRequest } from './entities/request.entity';
@Injectable()
export class RequestsService {
  constructor(
    private readonly callTouchApiRepository: CallTouchApiRequestRepository,
    @InjectRepository(CallTouchRequest)
    private readonly callTouchTypeormRepository: Repository<CallTouchRequest>,
  ) {}
  create(createCallDto: CreateCallTouchRequestDto) {
    return 'This action adds a new call';
  }

  async findAll(dateFrom = '16/09/2023', dateTo = '16/09/2023') {
    try {
      const $dateFrom = dayjs(dateFrom, 'DD/MM/YYYY');
      const $dateTo = dayjs(dateTo, 'DD/MM/YYYY');

      const isDateQueryBeforeCurrentDate = dayjs()
        .startOf('d')
        .isAfter($dateTo);
      if (isDateQueryBeforeCurrentDate) {
        const requests = await this.callTouchTypeormRepository.find({
          relations: {
            client: { phones: true },
            session: true,
          },
          where: {
            date: Between(
              $dateFrom.startOf('d').toDate(),
              $dateTo.endOf('d').toDate(),
            ),
          },
        });
        Logger.log('FROM_CASH', 'RequestsService.findAll');
        if (requests.length) return requests;
        else {
          const responseData = await this.callTouchApiRepository.findAll(
            $dateFrom.toDate(),
            $dateTo.toDate(),
          );
          Logger.log('NOT_CASHED', 'RequestsService.findAll');
          await this.callTouchTypeormRepository.save(responseData);
          Logger.log('SAVED_TO_CASH', 'RequestsService.findAll');

          return responseData;
        }
      } else {
        const responseData = await this.callTouchApiRepository.findAll(
          $dateFrom.toDate(),
          $dateTo.toDate(),
        );
        return responseData;
      }
    } catch (error) {
      Logger.error((<Error>error).message, 'RequestsService.findAll');
      throw new HttpException(
        {
          reason: 'RequestsService.findAll',
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errorText: (<Error>error).message,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
  async updateRequestsOnCurrentMoment() {
    try {
      const $dateFrom = dayjs().endOf('d');
      const $dateTo = dayjs().startOf('d');
      const requestFromCalltouch = await this.callTouchApiRepository.findAll(
        $dateFrom.toDate(),
        $dateTo.toDate(),
      );
      const requestsFromDatabase = await this.callTouchTypeormRepository.find({
        relations: {
          client: { phones: true },
          session: true,
        },
        where: {
          date: Between(
            $dateFrom.startOf('d').toDate(),
            $dateTo.endOf('d').toDate(),
          ),
        },
      });
      const uniqueRequestsByDate = requestFromCalltouch.reduce<
        CallTouchRequest[]
      >((accumulator, currentValue) => {
        const findIntersectValue = requestsFromDatabase.filter(
          (value) => currentValue.requestId === value.requestId,
        );
        if (findIntersectValue.length !== 0) return accumulator;
        return [...accumulator, currentValue];
      }, []);
      await this.callTouchTypeormRepository.save(uniqueRequestsByDate);
    } catch (error) {}
  }
  findOne(id: number) {
    return `This action returns a #${id} call`;
  }

  update(id: number, updateCallDto: UpdateCallTouchRequestDto) {
    return `This action updates a #${id} call`;
  }

  remove(id: number) {
    return `This action removes a #${id} call`;
  }
}
