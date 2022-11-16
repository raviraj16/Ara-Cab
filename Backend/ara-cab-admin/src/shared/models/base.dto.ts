export abstract class BaseDto {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    // Either is_discontinued or is_blocked can be used; neither of the two can be used
    is_discontinued?: boolean;
    is_blocked?: boolean;
}