import { AppBaseEntity } from "src/shared/models/app-base.entity";
import { CustomerTypes } from "src/shared/models/customer-types.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('customers')
export class CustomerEntity extends AppBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ select: false, insert: false, default: false })
    is_blocked: boolean;

    @Column({ length: 50, nullable: false })
    name: string;

    @Column({ length: 10, nullable: false, unique: true })
    phone: string;

    @Column({ length: 3, nullable: false, default: '+91' })
    country_code: string;

    @Column({ length: 50, nullable: true })
    email: string;

    @Column({
        type: "enum",
        enum: CustomerTypes,
        enumName: "customer_types",
        default: CustomerTypes.GUEST
    })
    customer_type: CustomerTypes;

}