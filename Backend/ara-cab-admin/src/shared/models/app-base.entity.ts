import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class AppBaseEntity {
   
    @CreateDateColumn({ type: 'timestamptz', })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', })
    updated_at: Date;
}