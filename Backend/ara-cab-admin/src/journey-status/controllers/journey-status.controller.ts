import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateJourneyStatusDto, SearchJourneyStatusDto, UpdateJourneyStatusDto } from '../models/journey-status.dto';
import { JourneyStatusService } from '../services/journey-status.service';

@Controller('journey-status')
export class JourneyStatusController {

    constructor(private readonly journeyStatusService: JourneyStatusService) { }

    @Post()
    create(@Body() journeyStatus: CreateJourneyStatusDto): Observable<CreateJourneyStatusDto | boolean> {
        return this.journeyStatusService.createJourneyStatus(journeyStatus);
    }

    @Get()
    search(@Query() query: SearchJourneyStatusDto): Observable<CreateJourneyStatusDto[]> {
        return this.journeyStatusService.searchJourneyStatuses(query);
    }

    @Get(':id')
    findOne(@Param('id') id: number): Observable<CreateJourneyStatusDto> {
        return this.journeyStatusService.findAJourneyStatus(id);
    }

    /*
        @Put(':id')
        update(
            @Param('id') id: number,
            @Body() journeyStatus: UpdateJourneyStatusDto
        ): Observable<boolean> {
            if (Object.keys(journeyStatus).length === 0) {
                return of(false);
            }
            return this.journeyStatusService.updateJourneyStatus(id, journeyStatus)
                .pipe(map(res => res.affected > 0));
        }
    */

}
