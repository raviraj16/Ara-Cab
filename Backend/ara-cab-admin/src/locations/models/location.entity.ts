import { AppBaseEntity } from "src/shared/models/app-base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('locations')
export class LocationEntity extends AppBaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ select: false, insert: false, default: false })
    is_discontinued: boolean;

    @Column({ length: 50, nullable: false, unique: true })
    place_name: string;

    @Column({ nullable: true, type:'real' })
    latitude: number;

    @Column({ nullable: true, type:'real' })
    longitude: number;

}