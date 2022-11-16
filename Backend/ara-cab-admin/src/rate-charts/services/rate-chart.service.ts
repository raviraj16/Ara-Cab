import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository, UpdateResult } from 'typeorm';
import { CreateRateChartDto, UpdateRateChartDto } from '../models/rate-chart.dto';
import { RateChartEntity } from '../models/rate-chart.entity';

@Injectable()
export class RateChartService {
    constructor(
        @InjectRepository(RateChartEntity)
        private readonly rateChartRepository: Repository<RateChartEntity>
    ) { }

    createRateChart(rateChart: CreateRateChartDto): Observable<CreateRateChartDto> {
        return from(this.rateChartRepository.save(rateChart));
    }

    findAllRateCharts(): Observable<CreateRateChartDto[]> {
        return from(this.rateChartRepository.find({ where: [{ is_discontinued: false }] }));
    }

    findAllDiscontinuedRateChart(): Observable<CreateRateChartDto[]> {
        return from(this.rateChartRepository.find({ where: [{ is_discontinued: true }] }));
    }

    findARateChart(id: number): Observable<CreateRateChartDto> {
        return from(this.rateChartRepository.findOneBy({ id, is_discontinued: false }));
    }

    updateRateChart(id: number, rateChart: UpdateRateChartDto): Observable<UpdateResult> {
        return from(this.rateChartRepository.update(id, rateChart));
    }

    discontinueRateChart(id: number): Observable<UpdateResult> {
        return from(this.rateChartRepository.update(id, { is_discontinued: true }));
    }
}
