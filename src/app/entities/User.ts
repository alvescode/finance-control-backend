import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column("varchar", { length: 100 })
  name!: string;

  @Column("varchar", { length: 100 })
  email!: string;

  @Column("varchar", { length: 100 })
  password!: string;
}
export default User;
