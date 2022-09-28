import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('locations')
export class LocationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    place_name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    is_discontinued: boolean;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}