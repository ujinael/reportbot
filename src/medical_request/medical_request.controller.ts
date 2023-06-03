import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicalRequestService } from './medical_request.service';
import { CreateMedicalRequestDto } from './dto/create-medical_request.dto';
import { UpdateMedicalRequestDto } from './dto/update-medical_request.dto';

@Controller('medical-request')
export class MedicalRequestController {
  constructor(private readonly medicalRequestService: MedicalRequestService) {}

  @Post()
  create(@Body() createMedicalRequestDto: CreateMedicalRequestDto) {
    return this.medicalRequestService.create(createMedicalRequestDto);
  }

  @Get()
  findAll() {
    return this.medicalRequestService.findAll();
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
