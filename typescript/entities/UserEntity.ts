import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// make a connection of the user table and the application passing each column

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
