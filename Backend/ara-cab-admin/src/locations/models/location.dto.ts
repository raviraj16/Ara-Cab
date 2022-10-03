import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsOptional, IsLatitude, IsLongitude, IsString } from "class-validator";
import { BaseDto } from "src/shared/models/base.dto"

export class CreateLocationDto extends BaseDto {
    is_discontinued?: boolean;

    @IsNotEmpty()
    @IsString()
    place_name: string;

    @IsOptional()
    @IsLatitude({message: 'latitude value is invalid'})
    latitude?: number;

    @IsOptional()
    @IsLongitude({message: 'longitude value is invalid'})
    longitude?: number;
}

export class UpdateLocationDto extends PartialType(CreateLocationDto) { }