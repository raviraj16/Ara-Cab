import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository, UpdateResult } from 'typeorm';
import { CreateVehicleDto, UpdateVehicleDto } from '../models/vehicle.dto';
import { VehicleEntity } from '../models/vehicle.entity';

@Injectable()
export class VehicleService {
    constructor(
        @InjectRepository(VehicleEntity)
        private readonly vehicleRepository: Repository<VehicleEntity>
    ) { }

    createVehicle(vehicle: CreateVehicleDto): Observable<CreateVehicleDto> {
        return from(this.vehicleRepository.save(vehicle));
    }

    findAllVehicles(): Observable<CreateVehicleDto[]> {
        return from(this.vehicleRepository.find({ where: [{ is_discontinued: false }] }));
    }

    findAllDiscontinuedVehicle(): Observable<CreateVehicleDto[]> {
        return from(this.vehicleRepository.find({ where: [{ is_discontinued: true }] }));
    }

    findAVehicle(id: number): Observable<CreateVehicleDto> {
        return from(this.vehicleRepository.findOneBy({ id, is_discontinued: false }));
    }

    updateVehicle(id: number, vehicle: UpdateVehicleDto): Observable<UpdateResult> {
        return from(this.vehicleRepository.update(id, vehicle));
    }

    discontinueVehicle(id: number): Observable<UpdateResult> {
        return from(this.vehicleRepository.update(id, { is_discontinued: true }));
    }
}
