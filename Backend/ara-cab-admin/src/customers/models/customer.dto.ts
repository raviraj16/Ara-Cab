import { IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CustomerTypes } from "src/shared/models/customer-types.enum";
import { BaseDto } from "src/shared/models/base.dto";

export class CreateCustomerDto extends BaseDto {
    is_blocked?: boolean;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsMobilePhone('en-IN', { message: 'phone number is invalid' })
    phone: string;

    @IsOptional()
    @IsString()
    country_code?: string;

    @IsEmail(undefined, { message: 'email is invalid' })
    @IsOptional()
    email?: string;

    @IsEnum(CustomerTypes)
    @IsOptional()
    customer_type?: CustomerTypes;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) { }