import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository, UpdateResult } from 'typeorm';
import { CreateDriverDto, UpdateDriverDto } from '../models/driver.dto';
import { DriverEntity } from '../models/driver.entity';

@Injectable()
export class DriverService {
    constructor(
        @InjectRepository(DriverEntity)
        private readonly driverRepository: Repository<DriverEntity>
    ) { }

    createDriver(driver: CreateDriverDto): Observable<CreateDriverDto> {
        return from(this.driverRepository.save(driver));
    }

    findAllDrivers(): Observable<CreateDriverDto[]> {
        return from(this.driverRepository.find({ where: [{ is_discontinued: false }] }));
    }

    findAllDiscontinuedDriver(): Observable<CreateDriverDto[]> {
        return from(this.driverRepository.find({ where: [{ is_discontinued: true }] }));
    }

    findADriver(id: number): Observable<CreateDriverDto> {
        return from(this.driverRepository.findOneBy({ id, is_discontinued: false }));
    }

    updateDriver(id: number, driver: UpdateDriverDto): Observable<UpdateResult> {
        return from(this.driverRepository.update(id, driver));
    }

    blockDriver(id: number): Observable<UpdateResult> {
        return from(this.driverRepository.update(id, { is_discontinued: true }));
    }
}
