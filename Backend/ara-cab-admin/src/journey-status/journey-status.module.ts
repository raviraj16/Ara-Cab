import { Module } from '@nestjs/common';
import { JourneyStatusService } from './services/journey-status.service';
import { JourneyStatusController } from './controllers/journey-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JourneyStatusEntity } from './models/journey-status.entity';

@Module({
  imports:[TypeOrmModule.forFeature([JourneyStatusEntity])],
  providers: [JourneyStatusService],
  controllers: [JourneyStatusController]
})
export class JourneyStatusModule {}
