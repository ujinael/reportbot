import { AbstractMapper } from '@/core';
import { UMCNomenclatureItemDto } from '../dto';
import { NomenclatureItem } from '../entities';

export class UMCNomenclatureItemDtoToNomenclatureItemMapper
  implements AbstractMapper<NomenclatureItem>
{
  constructor(private dto: UMCNomenclatureItemDto) {}
  mapTo(): NomenclatureItem {
    const nomenclatureItem = new NomenclatureItem();
    nomenclatureItem.title = this.dto.title;
    nomenclatureItem.id = this.dto.id;
    return nomenclatureItem;
  }
}
