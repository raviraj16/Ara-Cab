import { IsAlphanumeric, IsBoolean, IsEmail, IsEnum, IsInt, IsMobilePhone, IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { BaseDto } from "src/shared/models/base.dto";
import { VehicleTypes } from "src/shared/models/vehicle-types.enum";

export class CreateVehicleDto extends BaseDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    model_name: string;

    @MaxLength(50)
    @IsString()
    @IsOptional()
    model_description: string;

    @IsOptional()
    @IsPositive()
    @IsInt()
    owner_id?: number;

    @MaxLength(15)
    @IsAlphanumeric()
    licence_plate: string;

    @IsBoolean()
    @IsOptional()
    is_commercial?: boolean;

    @IsEnum(VehicleTypes)
    vehicle_type: VehicleTypes;
}

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) { }