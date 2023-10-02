import { Test, TestingModule } from '@nestjs/testing';
import { NomenclatureItemController } from './nomenclature_item.controller';
import { NomenclatureItemService } from './nomenclature_item.service';

describe('NomenclatureItemController', () => {
  let controller: NomenclatureItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomenclatureItemController],
      providers: [NomenclatureItemService],
    }).compile();

    controller = module.get<NomenclatureItemController>(
      NomenclatureItemController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
