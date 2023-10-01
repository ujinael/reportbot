import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { ILead } from './entities/lead.entity';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}
  @Get()
  findAll(
    @Query() query: { dateFrom: string; dateTo: string },
  ): Promise<ILead[]> {
    try {
      if (query.dateFrom === undefined && query.dateTo === undefined)
        throw Error('params dateFrom & dateTo required');
      return this.leadsService.findAll(query.dateFrom, query.dateTo);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadsService.update(+id, updateLeadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadsService.remove(+id);
  }
}
