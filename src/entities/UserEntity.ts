import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password_hash: string;
}

export default User;
