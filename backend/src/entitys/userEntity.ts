import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm"
import { ScoreAns, Summary } from "./scoreEntity"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: false })
    email!: string

    @Column({ nullable: false})
    password!: string

    @Column({ nullable: false})
    sex!: string

    @Column({ nullable: false})
    status!: string

    @Column({ nullable: false})
    age!: string

    @Column({ nullable: false})
    education_level!: string

    @Column({ nullable: false})
    occupation!: string

    @Column({ nullable: false})
    working_period_agrofood!: string

    @Column({ nullable: false})
    type_sme!: string

    @Column({ nullable: false})
    working_period!: string

    @Column({ nullable: false})
    num_personnel!: string

    @Column({ nullable: false})
    answer_1!: string

    @Column({ nullable: false})
    answer_2!: string

    @Column({ nullable: false})
    answer_3!: string

    @Column({ nullable: false})
    answer_4!: string

    @Column({ nullable: false})
    answer_5!: string

    @Column({ nullable: false})
    answer_6!: string

    @OneToMany(() => ScoreAns, scoreAns => scoreAns.user)
    scoreAns!: ScoreAns[]
}

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: false })
    token!: string

    @Column({ nullable: false })
    userId!: number

    @OneToOne(() => User)
    @JoinColumn()
    user!: User

}