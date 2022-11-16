import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository, UpdateResult } from 'typeorm';
import { CreateBookingDto, UpdateBookingDto } from '../models/booking.dto';
import { BookingEntity } from '../models/booking.entity';

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(BookingEntity)
        private readonly bookingRepository: Repository<BookingEntity>
    ) { }

    createBooking(booking: CreateBookingDto): Observable<CreateBookingDto> {
        return from(this.bookingRepository.save(booking));
    }

    findAllBookings(): Observable<CreateBookingDto[]> {
        return from(this.bookingRepository.find());
    }

    findABooking(id: number): Observable<CreateBookingDto> {
        return from(this.bookingRepository.findOneBy({ id }));
    }

    updateBooking(id: number, booking: UpdateBookingDto): Observable<UpdateResult> {
        return from(this.bookingRepository.update(id, booking));
    }

}
