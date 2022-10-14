import { AppBaseEntity } from "src/shared/models/app-base.entity";
import { Check, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('drivers')
export class DriverEntity extends AppBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ select: false, insert: false, default: false })
    is_discontinued: boolean;

    @Column({ length: 50, nullable: false })
    name: string;

    @Column({ type: 'date', nullable: true })
    dob: Date;

    @Column({ length: 50, nullable: true })
    email: string;

    @Column({ length: 18, nullable: true })
    licence_number: string;

    @Column({ type: 'date', nullable: true })
    licence_valid_upto: Date;

    @Column({ length: 10, nullable: false, unique: true })
    phone: string;

    @Column({ length: 10, nullable: true })
    alternate_phone: string;

    @Column({ length: 4, nullable: false, default: '+91' })
    country_code: string;

    @Column({ length: 150, nullable: true })
    address: string;

    @Column({ type: 'numeric', precision: 2, scale: 1, nullable: false, insert: false, default: 0 })
    @Check('driver_chk_ratings','"ratings" >= 1 AND ratings <= 5')
    ratings: number;

}