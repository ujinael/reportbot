import { Test, TestingModule } from '@nestjs/testing';
import { NomenclatureItemService } from './nomenclature_item.service';

describe('NomenclatureItemService', () => {
  let service: NomenclatureItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomenclatureItemService],
    }).compile();

    service = module.get<NomenclatureItemService>(NomenclatureItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
