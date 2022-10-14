import { DriverEntity } from "src/drivers/models/driver.entity";
import { LocationEntity } from "src/locations/models/location.entity";
import { AppBaseEntity } from "src/shared/models/app-base.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('ratecharts')
@Unique(["pick_up_location_id", "drop_location_id", "vehicle_id"])
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
    pick_up_location_id: number;

    @ManyToOne(() => LocationEntity, location => location.id, {
        onDelete: 'CASCADE',
        nullable: true
    })
    @JoinColumn({ name: "drop_location_id", foreignKeyConstraintName: 'fk_rate_charts_locations_drop' })
    drop_location_id: number;

    @Column({ type: 'smallint', nullable: true, })
    approx_distance_km: number;

    @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true})
    halt_charge_per_count: number;

    @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false})
    one_way_charge: number;

    @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true})
    round_trip_charge: number;

    @ManyToOne(() => LocationEntity, location => location.id, {
        onDelete: 'CASCADE',
        nullable: false
    })
    @JoinColumn({ name: "vehicle_id", foreignKeyConstraintName: 'fk_rate_charts_vehicles' })
    vehicle_id: number;

    @Column({
        type: "enum",
        enum: CustomerTypes,
        enumName: "customer_types",
        default: CustomerTypes.GUEST
    })
    customer_type: CustomerTypes;

}