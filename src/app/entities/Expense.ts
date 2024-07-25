import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity("expense")
class Expense {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column()
  @Index()
  userId!: number;

  @Column("varchar", { length: 150 })
  description!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  value!: number;

  @Column("varchar", { length: 30 })
  category!: string;

  @Column("varchar")
  isIncome!: boolean;
}
export default Expense;
