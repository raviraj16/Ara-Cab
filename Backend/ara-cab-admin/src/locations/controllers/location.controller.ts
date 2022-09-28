import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { LocationService } from '../services/location.service';
import { Location } from '../models/location.interface';
import { Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';
import { identifier } from '@babel/types';

@Controller('location')
export class LocationController {
    constructor(private readonly locationService: LocationService) { }

    @Post()
    create(@Body() location: Location): Observable<Location> {
        return this.locationService.createLocation(location);
    }

    @Get()
    findAll(): Observable<Location[]> {
        return this.locationService.findAllLocations();
    }

    @Put(':id')
    update(
        @Param('id') id,
        @Body() location: Location
    ): Observable<UpdateResult> {
        return this.locationService.updateLocation(id, location);
    }
}
