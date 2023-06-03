import { Module } from '@nestjs/common';
import { NomenclatureItemService } from './nomenclature_item.service';
import { NomenclatureItemController } from './nomenclature_item.controller';

@Module({
  controllers: [NomenclatureItemController],
  providers: [NomenclatureItemService]
})
export class NomenclatureItemModule {}
