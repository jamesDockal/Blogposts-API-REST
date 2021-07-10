import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./UserEntity";

@Entity("blogposts")
class Blogpost {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  slug: string;

  @Column()
  created_by: string;

  @JoinColumn({ name: "created_by" })
  @ManyToOne(() => User)
  createdBy: User;
}

export default Blogpost;
