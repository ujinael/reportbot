import { PartialType } from '@nestjs/mapped-types';
import { CreateNomenclatureItemDto } from './create-nomenclature_item.dto';

export class UpdateNomenclatureItemDto extends PartialType(
  CreateNomenclatureItemDto,
) {}
