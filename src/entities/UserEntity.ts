import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { hashSync } from "bcrypt";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column()
  password_hash: string;
}

export default User;
