import { Test, TestingModule } from '@nestjs/testing';
import { TenisService } from './tenis.service';

describe('TenisService', () => {
  let service: TenisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TenisService],
    }).compile();

    service = module.get<TenisService>(TenisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
