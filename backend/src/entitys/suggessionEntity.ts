import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Suggesstion {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: false })
    topic!: string

    @Column({ nullable: false })
    topic_th!: string

    @Column({ nullable: false })
    lower!: number

    @Column({ nullable: false })
    upper!: number

    @Column({ nullable: false, type: "longtext" })
    content!: string

}