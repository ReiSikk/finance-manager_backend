import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Role } from '../auth/enums/role.enum';
import { Entry } from '../entry/entities/entry.entity';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: [Role.User],
    })
    role: Role;

    @OneToMany(() => Entry, (entry) => entry.user)
    entries: Entry[]

}