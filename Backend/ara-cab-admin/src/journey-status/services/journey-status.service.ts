import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository, UpdateResult } from 'typeorm';
import { CreateJourneyStatusDto, SearchJourneyStatusDto, UpdateJourneyStatusDto } from '../models/journey-status.dto';
import { JourneyStatusEntity } from '../models/journey-status.entity';

@Injectable()
export class JourneyStatusService {
    constructor(
        @InjectRepository(JourneyStatusEntity)
        private readonly journeyStatusRepository: Repository<JourneyStatusEntity>
    ) { }

    createJourneyStatus(journeyStatus: CreateJourneyStatusDto): Observable<CreateJourneyStatusDto> {
        return from(this.journeyStatusRepository.save(journeyStatus));
    }

    searchJourneyStatuses(query: SearchJourneyStatusDto): Observable<CreateJourneyStatusDto[]> {
        return from(this.journeyStatusRepository.findBy(query));
    }

    findAJourneyStatus(id: number): Observable<CreateJourneyStatusDto> {
        return from(this.journeyStatusRepository.findOneBy({ id }));
    }

    updateJourneyStatus(id: number, journeyStatus: UpdateJourneyStatusDto): Observable<UpdateResult> {
        return from(this.journeyStatusRepository.update(id, journeyStatus));
    }
}
