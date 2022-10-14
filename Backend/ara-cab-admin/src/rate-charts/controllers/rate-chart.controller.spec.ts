import { Test, TestingModule } from '@nestjs/testing';
import { RateChartController } from './rate-chart.controller';

describe('RateChartController', () => {
  let controller: RateChartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RateChartController],
    }).compile();

    controller = module.get<RateChartController>(RateChartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
