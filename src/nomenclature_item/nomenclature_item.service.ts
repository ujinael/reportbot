import { Injectable } from '@nestjs/common';
import { CreateNomenclatureItemDto } from './dto/create-nomenclature_item.dto';
import { UpdateNomenclatureItemDto } from './dto/update-nomenclature_item.dto';

@Injectable()
export class NomenclatureItemService {
  create(createNomenclatureItemDto: CreateNomenclatureItemDto) {
    return 'This action adds a new nomenclatureItem';
  }

  findAll() {
    return `This action returns all nomenclatureItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nomenclatureItem`;
  }

  update(id: number, updateNomenclatureItemDto: UpdateNomenclatureItemDto) {
    return `This action updates a #${id} nomenclatureItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} nomenclatureItem`;
  }
}
