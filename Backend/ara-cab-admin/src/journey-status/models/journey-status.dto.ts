import { IsEnum, IsInt, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { BaseDto } from "src/shared/models/base.dto";
import { JourneyStatusTypes } from "src/shared/models/journey-status-types.enum";
import { UserTypes } from "src/shared/models/user-types.enum";
import { Type } from "class-transformer";

export class CreateJourneyStatusDto extends BaseDto {

    @IsPositive()
    @IsInt()
    @Type(() => Number)
    booking_id: number;

    @IsEnum(JourneyStatusTypes)
    status_type: JourneyStatusTypes;

    @IsEnum(UserTypes)
    updated_by_user_type: UserTypes;

    @MaxLength(50)
    @IsString()
    @IsOptional()
    status_description: string;
}

export class UpdateJourneyStatusDto extends PartialType(CreateJourneyStatusDto) { }

export class SearchJourneyStatusDto extends PartialType(CreateJourneyStatusDto) {
    @IsPositive()
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    id: number;
 }