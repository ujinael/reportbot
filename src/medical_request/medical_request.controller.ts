import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { MedicalRequestService } from './medical_request.service';
import { CreateMedicalRequestDto } from './dto/create-medical_request.dto';
import { UpdateMedicalRequestDto } from './dto/update-medical_request.dto';
import { dayjs } from '@/core';
@Controller('medical-request')
export class MedicalRequestController {
  constructor(private readonly medicalRequestService: MedicalRequestService) {}

  @Post()
  create(@Body() createMedicalRequestDto: CreateMedicalRequestDto) {
    return this.medicalRequestService.create(createMedicalRequestDto);
  }

  @Get()
  findAll(@Query() query: { dateFrom: string; dateTo: string }) {
    try {
      if (!query.dateFrom || !query.dateTo)
        throw Error('params dateFrom & dateTo are required');
      return this.medicalRequestService.findByParams({
        startDate: dayjs(query.dateFrom).toDate(),
        endDate: dayjs(query.dateTo).toDate(),
      });
    } catch (error) {
      Logger.log(error.message, 'MedicalRequestController.findAll');
      throw new HttpException(
        'params dateFrom & dateTo are required',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalRequestService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicalRequestDto: UpdateMedicalRequestDto,
  ) {
    return this.medicalRequestService.update(+id, updateMedicalRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalRequestService.remove(+id);
  }
}
