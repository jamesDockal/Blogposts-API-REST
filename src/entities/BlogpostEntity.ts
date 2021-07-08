import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./UserEntity";

@Entity("blogpost")
class Blogpost {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  slug: string;

  @JoinColumn({ name: "created_by" })
  @ManyToOne(() => User)
  created_by: User;
}

export default Blogpost;
