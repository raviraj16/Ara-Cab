import { CustomerEntity } from "src/customers/models/customer.entity";
import { DriverEntity } from "src/drivers/models/driver.entity";
import { RateChartEntity } from "src/rate-charts/models/rate-chart.entity";
import { AppBaseEntity } from "src/shared/models/app-base.entity";
import { BookingModes } from "src/shared/models/booking-modes.enum";
import { GST } from "src/shared/models/gst.enum";
import { JourneyScopes } from "src/shared/models/journey-scopes.enum";
import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('bookings')
@Check('chk_total_amount_positive', 'total_amount_ex_gst > -1')
export class BookingEntity extends AppBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => CustomerEntity, entity => entity.id, {
        onDelete: 'CASCADE',
        nullable: false
    })
    @JoinColumn({ name: "customer_id", foreignKeyConstraintName: 'fk_bookings_customers' })
    @Column({ nullable: false })
    customer_id: number;

    @ManyToOne(() => DriverEntity, entity => entity.id, {
        onDelete: 'CASCADE',
        nullable: false
    })
    @JoinColumn({ name: "driver_id", foreignKeyConstraintName: 'fk_bookings_drivers' })
    @Column({ nullable: false })
    driver_id: number;

    @Column({ type: 'timestamptz', nullable: false })
    pick_up_time: Date;

    @Column({
        type: "enum",
        enum: BookingModes,
        enumName: "booking_modes",
        nullable: false
    })
    booking_mode: BookingModes;

    @Column({ nullable: true, default: false })
    is_round_trip?: boolean;

    @Column({ nullable: true, default: false })
    has_night_halt?: boolean;

    @Column({ type: 'smallint', nullable: true })
    night_halt_count?: number;

    @ManyToOne(() => RateChartEntity, entity => entity.id, {
        onDelete: 'CASCADE',
        nullable: false
    })
    @JoinColumn({ name: "rate_chart_id", foreignKeyConstraintName: 'fk_bookings_ratecharts' })
    @Column({ nullable: false })
    rate_chart_id: number;

    @Column({ type: 'numeric', precision: 4, scale: 2, nullable: false, default: GST._5 })
    gst_percent: number;

    @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
    total_amount_ex_gst: number;
}