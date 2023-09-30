import { Injectable } from '@nestjs/common';
import { CreateCallTouchRequestDto } from './dto/create-request.dto';
import { UpdateCallTouchRequestDto } from './dto/update-request.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CallTouchApiRequestRepository } from './repository';
import { dayjs } from '@/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CallTouchRequest } from './entities/request.entity';
@Injectable()
export class RequestsService {
  constructor(
    private readonly httpModule: HttpService,
    private readonly configService: ConfigService,
    private readonly callTouchApiRepository: CallTouchApiRequestRepository,
    @InjectRepository(CallTouchRequest)
    private readonly callTouchTypeormRepository: Repository<CallTouchRequest>,
  ) {}
  create(createCallDto: CreateCallTouchRequestDto) {
    return 'This action adds a new call';
  }

  async findAll(dateFrom = '16/09/2023', dateTo = '16/09/2023') {
    const $dateFrom = dayjs(dateFrom, 'DD/MM/YYYY');
    const $dateTo = dayjs(dateTo, 'DD/MM/YYYY');

    const isDateQueryBeforeCurrentDate = dayjs().startOf('d').isAfter($dateTo);
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
      if (requests.length) return requests;
      else {
        const responseData = await this.callTouchApiRepository.findAll(
          $dateFrom.toDate(),
          $dateTo.toDate(),
        );
        console.log('NOT_CACHED');

        this.callTouchTypeormRepository.save(responseData);
        return responseData;
      }
    } else {
      const responseData = await this.callTouchApiRepository.findAll(
        $dateFrom.toDate(),
        $dateTo.toDate(),
      );
      return responseData;
    }
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
