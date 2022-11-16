import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { map, Observable, of } from 'rxjs';
import { CreateDriverDto, UpdateDriverDto } from '../models/driver.dto';
import { DriverService } from '../services/driver.service';

@Controller('driver')
export class DriverController {
    constructor(private readonly driverService: DriverService) { }

    @Post()
    create(@Body() driver: CreateDriverDto): Observable<CreateDriverDto | boolean> {
        return this.driverService.createDriver(driver);

    }

    @Get()
    findAll(): Observable<CreateDriverDto[]> {
        return this.driverService.findAllDrivers();
    }

    @Get('discontinued')
    findAllDiscontinued(): Observable<CreateDriverDto[]> {
        return this.driverService.findAllDiscontinuedDriver();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Observable<CreateDriverDto> {
        return this.driverService.findADriver(id);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() driver: UpdateDriverDto
    ): Observable<boolean> {
        if (Object.keys(driver).length === 0) {
            return of(false);
        }
        return this.driverService.updateDriver(id, driver)
            .pipe(map(res => res.affected > 0));
    }

    @Delete(':id')
    discontinue(@Param('id') id: number): Observable<boolean> {
        return this.driverService.discontinueDriver(id)
            .pipe(map(res => res.affected > 0));
    }
}
