import { IsEnum, IsInt, IsNumber, IsOptional, IsPositive } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { BaseDto } from "src/shared/models/base.dto";
import { JourneyScopes } from "src/shared/models/journey-scopes.enum";

export class CreateRateChartDto extends BaseDto {

    @IsPositive()
    @IsInt()
    pick_up_location_id: number;

    @IsOptional()
    @IsPositive()
    @IsInt()
    drop_location_id?: number;

    @IsOptional()
    @IsPositive()
    @IsInt()
    approx_distance_km?: number;

    @IsOptional()
    @IsPositive()
    @IsNumber()
    night_halt_charge_per_count?: number;

    @IsPositive()
    @IsNumber()
    one_way_charge: number;

    @IsOptional()
    @IsPositive()
    @IsNumber()
    round_trip_charge?: number;

    @IsPositive()
    @IsInt()
    vehicle_id: number;

    @IsEnum(JourneyScopes)
    journey_scope: JourneyScopes;
}

export class UpdateRateChartDto extends PartialType(CreateRateChartDto) { }