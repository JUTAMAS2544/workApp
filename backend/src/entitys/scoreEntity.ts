import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"

export abstract class Content {
  @PrimaryGeneratedColumn()
    id!: number

  @Column({ nullable: false })
    userId!: number

}

@Entity()
export class Score extends Content {
  @Column({ nullable: false, type: 'int' })
    ans1_tc!: number

  @Column({ nullable: false, type: 'int' })
    ans2_tc!: number

  @Column({ nullable: false, type: 'int' })
    ans3_tc!: number

  @Column({ nullable: false, type: 'int' })
    ans4_tc!: number

  @Column({ nullable: false, type: 'int' })
    ans5_tc!: number

  @Column({ nullable: false, type: 'int' })
    ans6_tc!: number

  @Column({ nullable: false, type: 'int' })
    ans7_tc!: number

  @Column({ nullable: false, type: 'int' })
    ans8_tc!: number

  @Column({ nullable: false, type: 'int' })
    ans9_tc!: number

  @Column({ nullable: false, type: 'int' })
    ans10_sp!: number

  @Column({ nullable: false, type: 'int' })
    ans11_sp!: number

  @Column({ nullable: false, type: 'int' })
    ans12_sp!: number

  @Column({ nullable: false, type: 'int' })
    ans13_it!: number

  @Column({ nullable: false, type: 'int' })
    ans14_it!: number

  @Column({ nullable: false, type: 'int' })
    ans15_it!: number

  @Column({ nullable: false, type: 'int' })
    ans16_it!: number

  @Column({ nullable: false, type: 'int' })
    ans17_it!: number

  @Column({ nullable: false, type: 'int' })
    ans18_it!: number

  @Column({ nullable: false, type: 'int' })
    ans19_it!: number

  @Column({ nullable: false, type: 'int' })
    ans20_ec!: number

  @Column({ nullable: false, type: 'int' })
    ans21_ec!: number

  @Column({ nullable: false, type: 'int' })
    ans22_ec!: number

  @Column({ nullable: false, type: 'int' })
    ans23_ec!: number

  @Column({ nullable: false, type: 'int' })
    ans24_ec!: number

  @Column({ nullable: false, type: 'int' })
    ans25_ec!: number

  @Column({ nullable: false, type: 'int' })
    ans26_ec!: number

  @Column({ nullable: false, type: 'int' })
    ans27_ec!: number

  @Column({ nullable: false, type: 'int' })
    ans28_ec!: number

  @Column({ nullable: false, type: 'int' })
    ans29_ec!: number

  @Column({ nullable: false, type: 'int' })
    ans30_ec!: number

}

@Entity()
export class Summary extends Content {
  @Column({ nullable: false, type: 'float', precision: 5, scale: 2 })
    tc_1!: number

  @Column({ nullable: false, type: 'float', precision: 5, scale: 2 })
    tc_2!: number

  @Column({ nullable: false, type: 'float', precision: 5, scale: 2 })
    tc_3!: number

  @Column({ nullable: false, type: 'float', precision: 5, scale: 2 })
    tc_4!: number

  @Column({ nullable: false, type: 'float', precision: 5, scale: 2 })
    sp_1!: number

  @Column({ nullable: false, type: 'float', precision: 5, scale: 2 })
    it_1!: number

  @Column({ nullable: false, type: 'float', precision: 5, scale: 2 })
    it_2!: number

  @Column({ nullable: false, type: 'float', precision: 5, scale: 2 })
    it_3!: number

  @Column({ nullable: false, type: 'float', precision: 5, scale: 2 })
    ec_1!: number

  @Column({ nullable: false, type: 'float', precision: 5, scale: 2 })
    ec_2!: number

  @Column({ nullable: false, type: 'float', precision: 5, scale: 2 })
    ec_3!: number

  @Column({ nullable: false, type: 'float', precision: 5, scale: 2 })
    ec_4!: number

  @Column({ nullable: false, type: 'float', precision: 5, scale: 2 })
    score!: number

}