import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { map, Observable, of } from 'rxjs';
import { CreateRateChartDto, UpdateRateChartDto } from '../models/rate-chart.dto';
import { RateChartService } from '../services/rate-chart.service';

@Controller('rate-chart')
export class RateChartController {
    constructor(private readonly rateChartService: RateChartService) { }

    @Post()
    create(@Body() rateChart: CreateRateChartDto): Observable<CreateRateChartDto | boolean> {
        return this.rateChartService.createRateChart(rateChart);

    }

    @Get()
    findAll(): Observable<CreateRateChartDto[]> {
        return this.rateChartService.findAllRateCharts();
    }

    @Get('discontinued')
    findAllDiscontinued(): Observable<CreateRateChartDto[]> {
        return this.rateChartService.findAllDiscontinuedRateChart();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Observable<CreateRateChartDto> {
        return this.rateChartService.findARateChart(id);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() rateChart: UpdateRateChartDto
    ): Observable<boolean> {
        if (Object.keys(rateChart).length === 0) {
            return of(false);
        }
        return this.rateChartService.updateRateChart(id, rateChart)
            .pipe(map(res => res.affected > 0));
    }

    @Delete(':id')
    discontinue(@Param('id') id: number): Observable<boolean> {
        return this.rateChartService.discontinueRateChart(id)
            .pipe(map(res => res.affected > 0));
    }
}
