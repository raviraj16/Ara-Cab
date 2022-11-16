import { DriverEntity } from "src/drivers/models/driver.entity";
import { AppBaseEntity } from "src/shared/models/app-base.entity";
import { VehicleTypes } from "src/shared/models/vehicle-types.enum";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('vehicles')
export class VehicleEntity extends AppBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ select: false, insert: false, default: false })
    is_discontinued: boolean;

    @Column({ length: 30, nullable: false })
    model_name: string;

    @Column({ length: 50, nullable: true })
    model_description: string;

    @ManyToOne(() => DriverEntity, driver => driver.id, {
        onDelete: 'CASCADE',
        nullable: true
    })
    @JoinColumn({ name: "owner_id", foreignKeyConstraintName: 'fk_vehicles_drivers' })
    @Column({ nullable: true })
    owner_id: number;

    @Column({ length: 15, nullable: false, unique: true })
    licence_plate: string;

    @Column({ nullable: false, default: false })
    is_commercial: boolean;

    @Column({
        type: "enum",
        enum: VehicleTypes,
        enumName: "vehicle_types",
        nullable: false
    })
    vehicle_type: VehicleTypes;

}