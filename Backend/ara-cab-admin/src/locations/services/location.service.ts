import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository, UpdateResult } from 'typeorm';
import { LocationEntity } from '../models/location.entity';
import { Location } from '../models/location.interface';

@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(LocationEntity)
        private readonly locationRepository: Repository<LocationEntity>
    ) { }

    createLocation(location: Location): Observable<Location> {
        return from(this.locationRepository.save(location));
    }

    findAllLocations(): Observable<Location[]> {
        return from(this.locationRepository.find());
    }

    updateLocation(id: number, location: Location): Observable<UpdateResult>{
        delete location.id;
        delete location.created_at;
        return from(this.locationRepository.update(id, location));
    }
}
