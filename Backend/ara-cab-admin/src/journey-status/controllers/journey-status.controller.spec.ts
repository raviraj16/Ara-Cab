import { Test, TestingModule } from '@nestjs/testing';
import { JourneyStatusController } from './journey-status.controller';

describe('JourneyStatusController', () => {
  let controller: JourneyStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JourneyStatusController],
    }).compile();

    controller = module.get<JourneyStatusController>(JourneyStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
