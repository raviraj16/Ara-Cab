import { IsDate, IsDateString, IsDecimal, IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, Max, MaxLength, Min } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CustomerTypes } from "src/shared/models/customer-types.enum";
import { BaseDto } from "src/shared/models/base.dto";
import { Type } from "class-transformer";

export class CreateDriverDto extends BaseDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;

    @IsOptional()
    @IsDateString()
    dob?: Date;

    @IsEmail(undefined, { message: 'email is invalid' })
    @MaxLength(50)
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    @MaxLength(18)
    licence_number?: string;

    @IsOptional()
    @IsDateString()
    licence_valid_upto?: Date;

    @IsMobilePhone('en-IN', { message: 'phone number is invalid' })
    phone: string;

    @IsMobilePhone('en-IN', { message: 'alternate phone number is invalid' })
    @IsOptional()
    alternate_phone: string;

    @IsOptional()
    @IsString()
    country_code?: string;

    @IsString()
    @IsOptional()
    address?: string;

}

export class UpdateDriverDto extends PartialType(CreateDriverDto) {
    @IsNumber({ maxDecimalPlaces: 1, allowNaN: false, allowInfinity: false })
    @IsOptional()
    @Min(1)
    @Max(5)
    ratings?: number;
}