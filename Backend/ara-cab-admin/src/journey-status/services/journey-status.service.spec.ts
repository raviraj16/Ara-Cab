import { Test, TestingModule } from '@nestjs/testing';
import { JourneyStatusService } from './journey-status.service';

describe('JourneyStatusService', () => {
  let service: JourneyStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JourneyStatusService],
    }).compile();

    service = module.get<JourneyStatusService>(JourneyStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
