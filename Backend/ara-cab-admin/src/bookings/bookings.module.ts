import { Module } from '@nestjs/common';
import { BookingService } from './services/booking.service';
import { BookingController } from './controllers/booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from './models/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookingEntity])],
  providers: [BookingService],
  controllers: [BookingController]
})
export class BookingsModule {}
