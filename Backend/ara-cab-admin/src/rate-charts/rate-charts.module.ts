import { Module } from '@nestjs/common';
import { RateChartService } from './services/rate-chart.service';
import { RateChartController } from './controllers/rate-chart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RateChartEntity])]
  providers: [RateChartService],
  controllers: [RateChartController]
})
export class RateChartsModule {}
