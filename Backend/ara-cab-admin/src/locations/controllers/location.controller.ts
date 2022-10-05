import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { LocationService } from '../services/location.service';
import { CreateLocationDto, UpdateLocationDto } from '../models/location.dto';
import { map, Observable, of } from 'rxjs';

@Controller('location')
export class LocationController {
    constructor(private readonly locationService: LocationService) { }

    @Post()
    create(@Body() location: CreateLocationDto): Observable<CreateLocationDto> {
        return this.locationService.createLocation(location);
    }

    @Get()
    findAll(): Observable<CreateLocationDto[]> {
        return this.locationService.findAllLocations();
    }

    @Get('discontinued')
    findAllDiscontinued(): Observable<CreateLocationDto[]> {
        return this.locationService.findAllDiscontinuedLocations();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Observable<CreateLocationDto> {
        return this.locationService.findALocation(id);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() location: UpdateLocationDto
    ): Observable<boolean> {
        if (Object.keys(location).length === 0) {
            return of(false);
        }
        return this.locationService.updateLocation(id, location)
            .pipe(map(res => res.affected > 0));
    }

    @Delete(':id')
    delete(@Param('id') id: number): Observable<boolean> {
        return this.locationService.softDeleteLocation(id)
            .pipe(map(res => res.affected > 0));
    }
}
