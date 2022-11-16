import { BookingEntity } from "src/bookings/models/booking.entity";
import { AppBaseEntity } from "src/shared/models/app-base.entity";
import { JourneyStatusTypes } from "src/shared/models/journey-status-types.enum";
import { UserTypes } from "src/shared/models/user-types.enum";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('journeystatuses')
@Unique(["booking_id", "status_type"])
export class JourneyStatusEntity extends AppBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => BookingEntity, entity => entity.id, {
        onDelete: 'CASCADE',
        nullable: false
    })
    @JoinColumn({ name: "booking_id", foreignKeyConstraintName: 'fk_journeystatuses_bookings' })
    @Column({ nullable: false })
    booking_id: number;

    @Column({
        type: "enum",
        enum: JourneyStatusTypes,
        enumName: "journey_status_types",
        nullable: false
    })
    status_type: JourneyStatusTypes;

    @Column({
        type: "enum",
        enum: UserTypes,
        enumName: "user_types",
        nullable: false
    })
    updated_by_user_type: UserTypes;

    @Column({ length: 50, nullable: true })
    status_description: string;
}