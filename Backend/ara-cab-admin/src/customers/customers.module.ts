import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './controllers/customer.controller';
import { CustomerEntity } from './models/customer.entity';
import { CustomerService } from './services/customer.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([CustomerEntity])
    ],
    controllers: [CustomerController],
    providers: [CustomerService]
})
export class CustomersModule { }
