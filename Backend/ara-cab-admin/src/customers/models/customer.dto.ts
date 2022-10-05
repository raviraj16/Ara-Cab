import { IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CustomerTypes } from "src/shared/models/customer-types.enum";
import { BaseDto } from "src/shared/models/base.dto";

export class CreateCustomerDto extends BaseDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;

    @IsMobilePhone('en-IN', { message: 'phone number is invalid' })
    phone: string;

    @IsMobilePhone('en-IN', { message: 'alternate phone number is invalid' })
    @IsOptional()
    @MaxLength(50)
    alternate_phone: string;

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