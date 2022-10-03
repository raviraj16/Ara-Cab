import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';
import { CreateCustomerDto, UpdateCustomerDto } from '../models/customer.dto';
import { CustomerService } from '../services/customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Post()
    create(@Body() customer: CreateCustomerDto): Observable<CreateCustomerDto | boolean> {
        return this.customerService.createCustomer(customer);

    }

    @Get()
    findAll(): Observable<CreateCustomerDto[]> {
        return this.customerService.findAllCustomers();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Observable<CreateCustomerDto> {
        return this.customerService.findACustomer(id);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() customer: UpdateCustomerDto
    ): Observable<boolean> {
        return this.customerService.updateCustomer(id, customer)
            .pipe(map(res => res.affected > 0));
    }

    @Delete(':id')
    delete(@Param('id') id: number): Observable<boolean> {
        return this.customerService.blockCustomer(id)
            .pipe(map(res => res.affected > 0));
    }
}
