import { Test, TestingModule } from '@nestjs/testing';
import { MedicalRequestService } from './medical_request.service';

describe('MedicalRequestService', () => {
  let service: MedicalRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalRequestService],
    }).compile();

    service = module.get<MedicalRequestService>(MedicalRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
