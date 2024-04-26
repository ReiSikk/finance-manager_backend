//Data model that TypeOrm can use to generate the database table
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "../../categories/entities/category.entity"
import { User } from "../../users/user.entity";
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

    @Column({ nullable: true}) 
    photo: string


    @ManyToOne(() => User, (user) => user.entries, {
        eager: true
    })
    user: User 

    @ManyToOne(() => Category, (category) => category.entries, {
        eager: true
    })
    category: Category

}
