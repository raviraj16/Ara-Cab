import { Module } from '@nestjs/common';
import { VehicleService } from './services/vehicle.service';
import { VehicleController } from './controllers/vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleEntity } from './models/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleEntity])],
  providers: [VehicleService],
  controllers: [VehicleController]
})
export class VehiclesModule { }
