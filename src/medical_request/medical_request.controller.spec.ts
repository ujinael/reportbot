import { Test, TestingModule } from '@nestjs/testing';
import { MedicalRequestController } from './medical_request.controller';
import { MedicalRequestService } from './medical_request.service';

describe('MedicalRequestController', () => {
  let controller: MedicalRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalRequestController],
      providers: [MedicalRequestService],
    }).compile();

    controller = module.get<MedicalRequestController>(MedicalRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
