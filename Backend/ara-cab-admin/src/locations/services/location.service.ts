import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository, UpdateResult } from 'typeorm';
import { LocationEntity } from '../models/location.entity';
import { CreateLocationDto, UpdateLocationDto } from '../models/location.dto';

@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(LocationEntity)
        private readonly locationRepository: Repository<LocationEntity>
    ) { }

    createLocation(location: CreateLocationDto): Observable<CreateLocationDto> {
        return from(this.locationRepository.save(location));
    }

    findAllLocations(): Observable<CreateLocationDto[]> {
        return from(this.locationRepository.find({ where: [{ is_discontinued: false }] }));
    }

    findALocation(id: number): Observable<CreateLocationDto> {
        return from(this.locationRepository.findOneBy({ id, is_discontinued: false }));
    }

    updateLocation(id: number, location: UpdateLocationDto): Observable<UpdateResult> {
        return from(this.locationRepository.update(id, location));
    }

    softDeleteLocation(id: number): Observable<UpdateResult> {
        return from(this.locationRepository.update(id, { is_discontinued: true }));
    }
}
