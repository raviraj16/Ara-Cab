import { Test, TestingModule } from '@nestjs/testing';
import { RateChartService } from './rate-chart.service';

describe('RateChartService', () => {
  let service: RateChartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RateChartService],
    }).compile();

    service = module.get<RateChartService>(RateChartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
