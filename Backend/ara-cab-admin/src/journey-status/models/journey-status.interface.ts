import { JourneyStatusTypes } from "src/shared/models/journey-status-types.enum";
import { UserTypes } from "src/shared/models/user-types.enum";

export interface SearchJourneyStatusModel {
    id?: number;
    booking_id?: number;
    status_type?: JourneyStatusTypes;
    updated_by_user_type?: UserTypes;
}