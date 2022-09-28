import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationController } from './controllers/location.controller';
import { LocationEntity } from './models/location.entity';
import { LocationService } from './services/location.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LocationEntity])
  ],
  controllers: [LocationController],
  providers: [LocationService]
})
export class LocationsModule {}
