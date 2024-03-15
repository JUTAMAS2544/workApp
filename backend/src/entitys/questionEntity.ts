import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

export abstract class Content {
  @PrimaryGeneratedColumn()
    id!: number

  @Column({ nullable: false })
    title!: string

  @Column({ nullable: false })
    question_1!: string

  @Column({ nullable: false })
    question_2!: string

  @Column({ nullable: false })
    question_3!: string
}

@Entity()
export class TC extends Content {
  @Column({ nullable: false })
    question_4!: string

  @Column({ nullable: false })
    question_5!: string

  @Column({ nullable: false })
    question_6!: string

  @Column({ nullable: false })
    question_7!: string

  @Column({ nullable: false })
    question_8!: string

  @Column({ nullable: false })
    question_9!: string

}

@Entity()
export class SP extends Content {
}

@Entity()
export class IT extends Content {
  @Column({ nullable: false })
    question_4!: string

  @Column({ nullable: false })
    question_5!: string

  @Column({ nullable: false })
    question_6!: string

  @Column({ nullable: false })
    question_7!: string
}

@Entity()
export class EC extends Content {
  @Column({ nullable: false })
    question_4!: string

  @Column({ nullable: false })
    question_5!: string

  @Column({ nullable: false })
    question_6!: string

  @Column({ nullable: false })
    question_7!: string

  @Column({ nullable: false })
    question_8!: string

  @Column({ nullable: false })
    question_9!: string

  @Column({ nullable: false })
    question_10!: string

  @Column({ nullable: false })
    question_11!: string

}
