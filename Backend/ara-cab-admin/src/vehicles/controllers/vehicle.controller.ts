import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { map, Observable, of } from 'rxjs';
import { CreateVehicleDto, UpdateVehicleDto } from '../models/vehicle.dto';
import { VehicleService } from '../services/vehicle.service';

@Controller('vehicle')
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) { }

    @Post()
    create(@Body() vehicle: CreateVehicleDto): Observable<CreateVehicleDto | boolean> {
        return this.vehicleService.createVehicle(vehicle);

    }

    @Get()
    findAll(): Observable<CreateVehicleDto[]> {
        return this.vehicleService.findAllVehicles();
    }

    @Get('discontinued')
    findAllDiscontinued(): Observable<CreateVehicleDto[]> {
        return this.vehicleService.findAllDiscontinuedVehicle();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Observable<CreateVehicleDto> {
        return this.vehicleService.findAVehicle(id);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() vehicle: UpdateVehicleDto
    ): Observable<boolean> {
        if (Object.keys(vehicle).length === 0) {
            return of(false);
        }
        return this.vehicleService.updateVehicle(id, vehicle)
            .pipe(map(res => res.affected > 0));
    }

    @Delete(':id')
    delete(@Param('id') id: number): Observable<boolean> {
        return this.vehicleService.blockVehicle(id)
            .pipe(map(res => res.affected > 0));
    }
}
