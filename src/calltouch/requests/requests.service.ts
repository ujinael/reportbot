import { Injectable } from '@nestjs/common';
import { CreateCallTouchRequestDto } from './dto/create-request.dto';
import { UpdateCallTouchRequestDto } from './dto/update-request.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, lastValueFrom, map } from 'rxjs';
import { CallTouchRequest } from './entities/request.entity';
import { ICallTouchRequestDto } from './dto/calltouch-request.dto';

@Injectable()
export class RequestsService {
  constructor(
    private readonly httpModule: HttpService,
    private readonly configService: ConfigService,
  ) {}
  create(createCallDto: CreateCallTouchRequestDto) {
    return 'This action adds a new call';
  }

  async findAll(dateFrom = '16/09/2023', dateTo = '16/09/2023') {
    const dateFromArray = dateFrom.split('/');
    const dateToArray = dateTo.split('/');

    const token = this.configService.get('calltouch.token');
    const $responseData = this.httpModule
      .get<ICallTouchRequestDto[]>(`calls-service/RestAPI/requests`, {
        params: {
          dateFrom: `${dateFromArray.at(1)}/${dateFromArray.at(
            0,
          )}/${dateFromArray.at(2)}`,
          dateTo: `${dateToArray.at(1)}/${dateToArray.at(0)}/${dateToArray.at(
            2,
          )}`,
          clientApiId: token,
        },
      })
      .pipe(
        catchError((err, resp) => {
          console.log(err);
          return resp;
        }),
      )
      .pipe(map((resp) => resp.data));
    return await lastValueFrom($responseData);
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
