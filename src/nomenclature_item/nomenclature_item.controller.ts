import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomenclatureItemService } from './nomenclature_item.service';
import { CreateNomenclatureItemDto } from './dto/create-nomenclature_item.dto';
import { UpdateNomenclatureItemDto } from './dto/update-nomenclature_item.dto';

@Controller('nomenclature-item')
export class NomenclatureItemController {
  constructor(private readonly nomenclatureItemService: NomenclatureItemService) {}

  @Post()
  create(@Body() createNomenclatureItemDto: CreateNomenclatureItemDto) {
    return this.nomenclatureItemService.create(createNomenclatureItemDto);
  }

  @Get()
  findAll() {
    return this.nomenclatureItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomenclatureItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomenclatureItemDto: UpdateNomenclatureItemDto) {
    return this.nomenclatureItemService.update(+id, updateNomenclatureItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomenclatureItemService.remove(+id);
  }
}
