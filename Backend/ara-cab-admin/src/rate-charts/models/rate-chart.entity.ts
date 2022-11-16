import { LocationEntity } from "src/locations/models/location.entity";
import { AppBaseEntity } from "src/shared/models/app-base.entity";
import { JourneyScopes } from "src/shared/models/journey-scopes.enum";
import { VehicleEntity } from "src/vehicles/models/vehicle.entity";
import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('ratecharts')
@Check("CHK_pickup_drop_unequal", '"pick_up_location_id" != "drop_location_id"')
@Unique(["pick_up_location_id", "drop_location_id", "vehicle_id", "journey_scope"])
export class RateChartEntity extends AppBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ select: false, insert: false, default: false })
    is_discontinued: boolean;

    @ManyToOne(() => LocationEntity, location => location.id, {
        onDelete: 'CASCADE',
        nullable: false
    })
    @JoinColumn({ name: "pick_up_location_id", foreignKeyConstraintName: 'fk_rate_charts_locations_pickup' })
    @Column()
    pick_up_location_id: number;

    @ManyToOne(() => LocationEntity, location => location.id, {
        onDelete: 'CASCADE',
        nullable: true
    })
    @JoinColumn({ name: "drop_location_id", foreignKeyConstraintName: 'fk_rate_charts_locations_drop' })
    @Column({ nullable: true })
    drop_location_id: number;

    @Column({ type: 'smallint', nullable: true, })
    approx_distance_km: number;

    @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
    night_halt_charge_per_count: number;

    @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
    one_way_charge: number;

    @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
    round_trip_charge: number;

    @ManyToOne(() => VehicleEntity, location => location.id, {
        onDelete: 'CASCADE',
        nullable: false
    })
    @JoinColumn({ name: "vehicle_id", foreignKeyConstraintName: 'fk_rate_charts_vehicles' })
    @Column({ nullable: false })
    vehicle_id: number;

    @Column({
        type: "enum",
        enum: JourneyScopes,
        enumName: "journey_scopes",
        default: JourneyScopes.LOCAL
    })
    journey_scope: JourneyScopes;

}