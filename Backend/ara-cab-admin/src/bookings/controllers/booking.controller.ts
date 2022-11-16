import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { map, Observable, of } from 'rxjs';
import { CreateBookingDto, UpdateBookingDto } from '../models/booking.dto';
import { BookingService } from '../services/booking.service';

@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    @Post()
    create(@Body() booking: CreateBookingDto): Observable<CreateBookingDto | boolean> {
        return this.bookingService.createBooking(booking);

    }

    @Get()
    findAll(): Observable<CreateBookingDto[]> {
        return this.bookingService.findAllBookings();
    }


    @Get(':id')
    findOne(@Param('id') id: number): Observable<CreateBookingDto> {
        return this.bookingService.findABooking(id);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() booking: UpdateBookingDto
    ): Observable<boolean> {
        if (Object.keys(booking).length === 0) {
            return of(false);
        }
        return this.bookingService.updateBooking(id, booking)
            .pipe(map(res => res.affected > 0));
    }
}
