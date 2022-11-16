import { IsAlphanumeric, IsBoolean, IsDate, IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength, MinDate } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { BaseDto } from "src/shared/models/base.dto";
import { JourneyScopes } from "src/shared/models/journey-scopes.enum";
import { BookingModes } from "src/shared/models/booking-modes.enum";
import { Transform } from "class-transformer";

export class CreateBookingDto extends BaseDto {

    @IsPositive()
    @IsInt()
    customer_id: number;

    @IsPositive()
    @IsInt()
    driver_id: number;

    @Transform(({ value }) => value && new Date(value))
    @IsDate()
    @MinDate(new Date())
    pick_up_time: Date;

    @IsEnum(BookingModes)
    booking_mode: BookingModes;

    @IsOptional()
    @IsBoolean()
    is_round_trip?: boolean;

    @IsOptional()
    @IsBoolean()
    has_night_halt?: boolean;

    @IsOptional()
    @IsPositive()
    @IsInt()
    night_halt_count?: number;

    @IsPositive()
    @IsInt()
    rate_chart_id: number;

    // gst_percent:number; // This will not be passed through api, it will by default inserted in db

    @IsPositive()
    @IsNumber()
    total_amount_ex_gst: number;
}

export class UpdateBookingDto extends PartialType(CreateBookingDto) { }