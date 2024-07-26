import { Test, TestingModule } from '@nestjs/testing';
import { TenisController } from './tenis.controller';
import { TenisService } from './tenis.service';

describe('TenisController', () => {
  let controller: TenisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TenisController],
      providers: [TenisService],
    }).compile();

    controller = module.get<TenisController>(TenisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
