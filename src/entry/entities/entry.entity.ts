//Data model that TypeOrm can use to generate the database table
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class Entry {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    amount: number
    
    @Column()
    date: Date

    @Column()
    currency: string

    @Column()
    name: string

    @Column()
    comment: string

}
