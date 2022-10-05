import { Module } from '@nestjs/common';
import { DriverService } from './services/driver.service';
import { DriverController } from './controllers/driver.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverEntity } from './models/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DriverEntity])],
  providers: [DriverService],
  controllers: [DriverController]
})
export class DriversModule {}
