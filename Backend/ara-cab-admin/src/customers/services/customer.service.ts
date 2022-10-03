import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository, UpdateResult } from 'typeorm';
import { CustomerEntity } from '../models/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../models/customer.dto';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(CustomerEntity)
        private readonly customerRepository: Repository<CustomerEntity>
    ) { }

    createCustomer(customer: CreateCustomerDto): Observable<CreateCustomerDto> {
        return from(this.customerRepository.save(customer));
    }

    findAllCustomers(): Observable<CreateCustomerDto[]> {
        return from(this.customerRepository.find({ where: [{ is_blocked: false }] }));
    }

    findACustomer(id: number): Observable<CreateCustomerDto> {
        return from(this.customerRepository.findOneBy({ id, is_blocked: false }));
    }

    updateCustomer(id: number, customer: UpdateCustomerDto): Observable<UpdateResult> {
        return from(this.customerRepository.update(id, customer));
    }

    blockCustomer(id: number): Observable<UpdateResult> {
        return from(this.customerRepository.update(id, { is_blocked: true }));
    }
}
